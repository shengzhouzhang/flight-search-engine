
import React from 'react';
import moment from 'moment';

export default class FlightDetails extends React.Component {
  static propTypes = {
    number: React.PropTypes.string.isRequired,
    from: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    departureTime: React.PropTypes.number.isRequired,
    arrivalTime: React.PropTypes.number.isRequired
  };
  render = () => {
    return (
      <div className="flight-details">
        <FlightNumber value={this.props.number} />
        <From value={this.props.from} />
        <Destination value={this.props.destination} />
        <Departure value={this.props.departureTime} />
        <Arrival value={this.props.arrivalTime} />
      </div>
    );
  };
}

export class FlightNumber extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div className="flight-number">{ this.props.value }</div>);
  };
}

export class From extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div className="flight-from">{ this.props.value }</div>);
  };
}

export class Destination extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div className="flight-destination">{ this.props.value }</div>);
  };
}

export class Departure extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  };
  render = () => {
    return (<div className="flight-departure">{ moment(this.props.value).format('HH:mm A') }</div>);
  };
}

export class Arrival extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  };
  render = () => {
    return (<div className="flight-arrival">{ moment(this.props.value).format('HH:mm A') }</div>);
  };
}
