
import React from 'react';
import FlightDetails from '../../components/SearchResults/FlightDetails';

export default class ResultItem extends React.Component {
  static propTypes = {
    flight: React.PropTypes.object.isRequired,
    return: React.PropTypes.object,
    price: React.PropTypes.number.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };
  render = () => {
    return (
      <div className="search-result-item">
        <OneWay flight={ this.props.flight } />
        { !!this.props.return ? (<Return flight={ this.props.return } />) : (undefined) }
      </div>
    );
  };
}

export class OneWay extends React.Component {
  static propTypes = {
    flight: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className="flight-details-one-way">
        <FlightDetails {...this.props.flight} />
      </div>
    );
  };
}

export class Return extends React.Component {
  static propTypes = {
    flight: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className="flight-details-return">
        <FlightDetails {...this.props.flight} />
      </div>
    );
  };
}
