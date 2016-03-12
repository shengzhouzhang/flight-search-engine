
import _ from 'lodash';
import Promise from 'bluebird';
import React from 'react';
import TextInput from '../../components/SearchForm/TextInput';
import DateInput from '../../components/SearchForm/DateInput';
import NumericInput from '../../components/SearchForm/NumericInput';
import SubmitButton from '../../components/SearchForm/SubmitButton';
import ticketTypes from '../../config/ticketTypes';

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
          .then(query => console.log(query));
        break;
      case ticketTypes.RETURN:
        return this.buildQueryReturn()
          .then(query => console.log(query));
        break;
      default:
        throw new Error(`invalid search form type: ${this.props.type}`);
    }
  };
  hasReturnFlight = () => {
    return this.props.type === ticketTypes.RETURN;
  };
  buildQueryOneWay = () => {
    return Promise.resolve({
      type: ticketTypes.ONEWAY,
      query: {
        from: this.state.from,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        passengers: this.state.passengers
      }
    });
  };
  buildQueryReturn = () => {
    return Promise.resolve({
      type: ticketTypes.RETURN,
      query: {
        from: this.state.from,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        returnDate: this.state.returnDate,
        passengers: this.state.passengers
      }
    });
  };
}
