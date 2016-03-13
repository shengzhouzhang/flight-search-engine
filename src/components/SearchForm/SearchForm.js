
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import React from 'react';
import TextInput from '../../components/SearchForm/TextInput';
import DateInput from '../../components/SearchForm/DateInput';
import NumericInput from '../../components/SearchForm/NumericInput';
import SubmitButton from '../../components/SearchForm/SubmitButton';
import { SearchQueryOneWay, SearchQueryReturn } from '../../domains/SearchQuery' ;
import Currency from '../../domains/Currency' ;
import currencyTypes from '../../config/currencyTypes';

export class SearchFormOneWay extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  };
  state = {
    from: '',
    destination: '',
    departureDate: moment().format('YYYY-MM-DD'),
    passengers: 1
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from"
          value={this.state.from} onChange={this.onChangeHandler} />
        <TextInput fieldName="destination" displayName="destination"
          value={this.state.destination} onChange={this.onChangeHandler} />
        <DateInput fieldName="departureDate" displayName="departure date"
          value={this.state.departureDate} onChange={this.onChangeHandler} />
        <NumericInput fieldName="passengers" displayName="passengers"
          value={this.state.passengers} onChange={this.onChangeHandler} />
        <SubmitButton onSubmit={this.onSubmitHandler} />
      </div>
    );
  };
  onChangeHandler = (fields) => {
    this.setState(fields);
  };
  onSubmitHandler = () => {
    return this.buildQuery()
      .then(query => this.props.onSearch(query));
  };
  buildQuery = () => {
    let query = new SearchQueryOneWay(
      Currency.fromJson(currencyTypes.GBP),
      this.state.from,
      this.state.destination,
      this.state.departureDate,
      this.state.passengers
    );
    if (!query.from) { return Promise.reject(new Error('invalid input from')); }
    if (!query.destination) { return Promise.reject(new Error('invalid input destination')); }
    if (!query.departureDate) { return Promise.reject(new Error('invalid input departure date')); }
    if (!query.passengers) { return Promise.reject(new Error('invalid input passengers')); }
    return Promise.resolve(query);
  };
}

export class SearchFormReturn extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  };
  state = {
    from: '',
    destination: '',
    departureDate: moment().format('YYYY-MM-DD'),
    returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    passengers: 1
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from"
          value={this.state.from} onChange={this.onChangeHandler} />
        <TextInput fieldName="destination" displayName="destination"
          value={this.state.destination} onChange={this.onChangeHandler} />
        <DateInput fieldName="departureDate" displayName="departure date"
          value={this.state.departureDate} onChange={this.onChangeHandler} />
        <DateInput fieldName="returnDate" displayName="return date"
          value={this.state.returnDate} onChange={this.onChangeHandler} />
        <NumericInput fieldName="passengers" displayName="passengers"
          value={this.state.passengers} onChange={this.onChangeHandler} />
        <SubmitButton onSubmit={this.onSubmitHandler} />
      </div>
    );
  };
  onChangeHandler = (fields) => {
    this.setState(fields);
  };
  onSubmitHandler = () => {
    return this.buildQuery()
      .then(query => this.props.onSearch(query));
  };
  buildQuery = () => {
    let query = new SearchQueryReturn(
      Currency.fromJson(currencyTypes.GBP),
      this.state.from,
      this.state.destination,
      this.state.departureDate,
      this.state.returnDate,
      this.state.passengers
    );
    if (!query.from) { return Promise.reject(new Error('invalid input from')); }
    if (!query.destination) { return Promise.reject(new Error('invalid input destination')); }
    if (!query.departureDate) { return Promise.reject(new Error('invalid input departure date')); }
    if (!query.returnDate) { return Promise.reject(new Error('invalid input return date')); }
    if (!query.passengers) { return Promise.reject(new Error('invalid input passengers')); }
    return Promise.resolve(query);
  };
}
