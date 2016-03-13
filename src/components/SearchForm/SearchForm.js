
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
    fields: {
      from: '',
      destination: '',
      departureDate: moment().format('YYYY-MM-DD'),
      passengers: 1
    },
    errors: {
      from: false,
      destination: false,
      departureDate: false,
      passengers: false
    }
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from"
          value={this.state.fields.from} hasError={this.state.errors.from}
          onChange={this.onChangeHandler} />
        <TextInput fieldName="destination" displayName="destination"
          value={this.state.fields.destination} hasError={this.state.errors.destination}
          onChange={this.onChangeHandler} />
        <DateInput fieldName="departureDate" displayName="departure date"
          value={this.state.fields.departureDate} hasError={this.state.errors.departureDate}
          onChange={this.onChangeHandler} />
        <NumericInput fieldName="passengers" displayName="passengers"
          value={this.state.fields.passengers} hasError={this.state.errors.passengers}
          onChange={this.onChangeHandler} />
        <SubmitButton onSubmit={this.onSubmitHandler} />
      </div>
    );
  };
  onChangeHandler = (fieldName, value) => {
    let fields = { ...this.state.fields };
    fields[fieldName] = value;
    let errors = { ...this.state.errors };
    errors[fieldName] = false;
    this.setState({ fields, errors });
  };
  onSubmitHandler = () => {
    if (this.isValid(this.state.fields)) {
      this.props.onSearch(new SearchQueryOneWay(
        Currency.fromJson(currencyTypes.GBP),
        this.state.fields.from,
        this.state.fields.destination,
        this.state.fields.departureDate,
        this.state.fields.passengers
      ));
    }
  };
  isValid = (fields) => {
    let hasError = false;
    if (!fields.from) { this.state.errors.from = true; hasError = true; }
    if (!fields.destination ||
        (fields.from && fields.destination && fields.from === fields.destination)) {
      this.state.errors.destination = true;
      hasError = true;
    }
    if (!fields.departureDate) { this.state.errors.departureDate = true; hasError = true; }
    if (!fields.passengers || fields.passengers <= 0) {
      this.state.errors.passengers = true;
      hasError = true;
    }
    if (hasError) { this.forceUpdate(); }
    return !hasError;
  };
}

export class SearchFormReturn extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  };
  state = {
    fields: {
      from: '',
      destination: '',
      departureDate: moment().format('YYYY-MM-DD'),
      returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      passengers: 1
    },
    errors: {
      from: false,
      destination: false,
      departureDate: false,
      returnDate: false,
      passengers: false
    }
  };
  render = () => {
    return (
      <div className="search-form">
        <TextInput fieldName="from" displayName="from"
          value={this.state.fields.from} hasError={this.state.errors.from}
          onChange={this.onChangeHandler} />
        <TextInput fieldName="destination" displayName="destination"
          value={this.state.fields.destination} hasError={this.state.errors.destination}
          onChange={this.onChangeHandler} />
        <DateInput fieldName="departureDate" displayName="departure date"
          value={this.state.fields.departureDate} hasError={this.state.errors.departureDate}
          onChange={this.onChangeHandler} />
        <DateInput fieldName="returnDate" displayName="return date"
          value={this.state.fields.returnDate} hasError={this.state.errors.returnDate}
          onChange={this.onChangeHandler} />
        <NumericInput fieldName="passengers" displayName="passengers"
          value={this.state.fields.passengers} hasError={this.state.errors.passengers}
          onChange={this.onChangeHandler} />
        <SubmitButton onSubmit={this.onSubmitHandler} />
      </div>
    );
  };
  onChangeHandler = (fieldName, value) => {
    let fields = { ...this.state.fields };
    fields[fieldName] = value;
    let errors = { ...this.state.errors };
    errors[fieldName] = false;
    this.setState({ fields, errors });
  };
  onSubmitHandler = () => {
    if (this.isValid(this.state.fields)) {
      this.props.onSearch(new SearchQueryReturn(
        Currency.fromJson(currencyTypes.GBP),
        this.state.fields.from,
        this.state.fields.destination,
        this.state.fields.departureDate,
        this.state.fields.returnDate,
        this.state.fields.passengers
      ));
    }
  };
  isValid = (fields) => {
    let hasError = false;
    if (!fields.from) { this.state.errors.from = true; hasError = true; }
    if (!fields.destination ||
        (fields.from && fields.destination && fields.from === fields.destination)) {
      this.state.errors.destination = true;
      hasError = true;
    }
    if (!fields.departureDate) { this.state.errors.departureDate = true; hasError = true; }
    if (!fields.returnDate ||
        (fields.departureDate && fields.returnDate &&
         moment(fields.departureDate, 'YYYY-MM-DD').valueOf() > moment(fields.returnDate, 'YYYY-MM-DD').valueOf())) {
           this.state.errors.returnDate = true;
           hasError = true;
    }
    if (!fields.passengers || fields.passengers <= 0) {
      this.state.errors.passengers = true;
      hasError = true;
    }
    if (hasError) { this.forceUpdate(); }
    return !hasError;
  };
}
