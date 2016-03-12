
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import React from 'react';
import TextInput from '../../components/SearchForm/TextInput';
import DateInput from '../../components/SearchForm/DateInput';
import NumericInput from '../../components/SearchForm/NumericInput';
import SubmitButton from '../../components/SearchForm/SubmitButton';
import ticketTypes from '../../config/ticketTypes';

import resultStore from '../../browser/stores/results';
import { search } from '../../browser/ajax/search';

export default class SearchForm extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf([ ticketTypes.ONEWAY, ticketTypes.RETURN ]).isRequired
  };
  constructor (props) {
    super(props);
    this.state = {
      from: '',
      destination: '',
      departureDate: moment().format('YYYY-MM-DD'),
      passengers: 1
    };
    if (this.hasReturnFlight()) {
      this.state.returnDate = moment().add(1, 'day').format('YYYY-MM-DD');
    }
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from"
          value={this.state.from} onChange={this.onChangeHandler}
        />
        <TextInput fieldName="destination" displayName="destination"
          value={this.state.destination} onChange={this.onChangeHandler}
        />
        <DateInput fieldName="departureDate" displayName="departure date"
          value={this.state.departureDate} onChange={this.onChangeHandler}
        />
        {
          this.hasReturnFlight() ?
            (
              <DateInput fieldName="returnDate" displayName="return date"
                value={this.state.returnDate} onChange={this.onChangeHandler}
              />
            ) :
            (undefined)
        }
        <NumericInput fieldName="passengers" displayName="passengers"
          value={this.state.passengers} onChange={this.onChangeHandler}
        />
        <SubmitButton onSubmit={this.onSubmitHandler} />
      </div>
    );
  };
  onChangeHandler = (fields) => {
    this.setState(fields);
  };
  onSubmitHandler = () => {
    switch(this.props.type) {
      case ticketTypes.ONEWAY:
        return this.buildQueryOneWay()
          .then(query => this.search(query));
        break;
      case ticketTypes.RETURN:
        return this.buildQueryReturn()
          .then(query => this.search(query));
        break;
      default:
        throw new Error(`invalid search form type: ${this.props.type}`);
    }
  };
  search = (query) => {
    return search(query)
      .then(result => resultStore.dispatch({ type: 'UPDATE', result: result }))
      .catch(err => console.error(err.stack));
  };
  hasReturnFlight = () => {
    return this.props.type === ticketTypes.RETURN;
  };
  buildQueryOneWay = () => {
    let query = {
      type: ticketTypes.ONEWAY,
      from: this.state.from,
      destination: this.state.destination,
      departureDate: this.state.departureDate,
      passengers: this.state.passengers
    };

    if (!query.from) { return Promise.reject(new Error('invalid input from')); }
    if (!query.destination) { return Promise.reject(new Error('invalid input destination')); }
    if (!query.departureDate) { return Promise.reject(new Error('invalid input departure date')); }
    if (!query.passengers) { return Promise.reject(new Error('invalid input passengers')); }

    return Promise.resolve(query);
  };
  buildQueryReturn = () => {
    let query = {
      type: ticketTypes.RETURN,
      from: this.state.from,
      destination: this.state.destination,
      departureDate: this.state.departureDate,
      returnDate: this.state.returnDate,
      passengers: this.state.passengers
    };

    if (!query.from) { return Promise.reject(new Error('invalid input from')); }
    if (!query.destination) { return Promise.reject(new Error('invalid input destination')); }
    if (!query.departureDate) { return Promise.reject(new Error('invalid input departure date')); }
    if (!query.returnDate) { return Promise.reject(new Error('invalid input return date')); }
    if (!query.passengers) { return Promise.reject(new Error('invalid input passengers')); }

    return Promise.resolve(query);
  };
}
