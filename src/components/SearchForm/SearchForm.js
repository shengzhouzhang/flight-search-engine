
import _ from 'lodash';
import React from 'react';
import TextInput from '../../components/TextInput';
import DateInput from '../../components/DateInput';
import NumericInput from '../../components/NumericInput';
import SubmitButton from '../../components/SubmitButton';

const TICKET_TYPES = {
  ONEWAY: 'one-way',
  RETURN: 'return',
}
export default class SearchForm extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneof([ TICKET_TYPES.ONEWAY, TICKET_TYPES.RETURN ]).isRequired
  };
  state = {
    from: null,
    destination: null,
    departureDate: null,
    returnDate: null,
    passengers: null,
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
      case TICKET_TYPES.ONEWAY:
        let query = this.buildQueryOneWay();
        console.log(query);
        break;
      case TICKET_TYPES.RETURN:
        let query = this.buildQueryReturn();
        console.log(query);
        break;
      default:
        throw new Error(`invalid search form type: ${this.props.type}`);
    }
  };
  hasReturnFlight = () => {
    return this.props.type === TICKET_TYPES.RETURN;
  };
  buildQueryOneWay = () => {
    return {
      type: TICKET_TYPES.ONEWAY,
      query: {
        from: this.state.from,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        passengers: this.state.passengers
      }
    };
  };
  buildQueryReturn = () => {
    return {
      type: TICKET_TYPES.RETURN,
      query: {
        from: this.state.from,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        returnDate: this.state.returnDate,
        passengers: this.state.passengers
      }
    };
  };
}
