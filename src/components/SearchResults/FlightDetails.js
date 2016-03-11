
import React from 'react';
import moment from 'moment';

export default class FlightDetails extends React.Component {
  static propTypes = {
    number: React.PropTypes.string.isRequired,
    from: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    depart: React.PropTypes.number.isRequired,
    arrive: React.PropTypes.number.isRequired
  };
  render = () => {
    return (
      <div class="flight-details">
        <FlightNumber value={this.props.number} />
        <From value={this.props.from} />
        <Destination value={this.props.destination} />
        <Depart value={this.props.depart} />
        <Arrive value={this.props.arrive} />
      </div>
    );
  };
}

export class FlightNumber extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div class="flight-number">{ this.props.value }</div>);
  };
}

export class From extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div class="flight-from">{ this.props.value }</div>);
  };
}

export class Destination extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  };
  render = () => {
    return (<div class="flight-destination">{ this.props.value }</div>);
  };
}

export class Depart extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  };
  render = () => {
    return (<div class="flight-depart">{ moment(this.props.value).format('HH:mm A') }</div>);
  };
}

export class Arrive extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  };
  render = () => {
    return (<div class="flight-arrive">{ moment(this.props.value).format('HH:mm A') }</div>);
  };
}
