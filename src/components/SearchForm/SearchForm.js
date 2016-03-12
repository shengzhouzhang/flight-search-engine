
import _ from 'lodash';
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
      from: null,
      destination: null,
      departureDate: null,
      passengers: null
    };
    if (this.hasReturnFlight()) { this.state.returnDate = null; }
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from" onChange={this.onChangeHandler} />
        <TextInput fieldName="destination" displayName="destination" onChange={this.onChangeHandler} />
        <DateInput fieldName="departureDate" displayName="departure date" onChange={this.onChangeHandler} />
        { this.hasReturnFlight() ? (<DateInput fieldName="returnDate" displayName="return date" onChange={this.onChangeHandler} />) : (undefined) }
        <NumericInput fieldName="passengers" displayName="passengers" onChange={this.onChangeHandler} />
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
          .then(query => this.onSearch(query));
        break;
      case ticketTypes.RETURN:
        return this.buildQueryReturn()
          .then(query => this.onSearch(query));
        break;
      default:
        throw new Error(`invalid search form type: ${this.props.type}`);
    }
  };
  search = (query) => {
    return search(query)
      .then(results => resultStore.dispatch({
        type: 'UPDATE',
        results: { query: query, tickets: results }
      }))
      .catch(err => alert(err));
  };
  hasReturnFlight = () => {
    return this.props.type === ticketTypes.RETURN;
  };
  buildQueryOneWay = () => {
    return Promise.resolve({
      type: ticketTypes.ONEWAY,
      ...this.state
    });
  };
  buildQueryReturn = () => {
    return Promise.resolve({
      type: ticketTypes.RETURN,
      ...this.state
    });
  };
}
