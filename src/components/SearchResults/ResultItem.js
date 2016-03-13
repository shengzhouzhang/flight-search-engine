
import React from 'react';
import Logo from '../../components/SearchResults/Logo';
import FlightDetails from '../../components/SearchResults/FlightDetails';
import Price from '../../components/SearchResults/Price';
import SelectButton from '../../components/SearchResults/SelectButton';

export default class ResultItem extends React.Component {
  static propTypes = {
    _id: React.PropTypes.string.isRequired,
    airline: React.PropTypes.object.isRequired,
    departureFlight: React.PropTypes.object.isRequired,
    returnFlight: React.PropTypes.object,
    price: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className={"search-result-item"}>
        <Logo imageUri={this.props.airline.logo.imageUri} />
        <FlightDetails {...this.props.departureFlight} />
        { !!this.props.returnFlight ? (<FlightDetails {...this.props.returnFlight} />) : (undefined) }
        <Price {...this.props.price} />
        <SelectButton onSelect={this.onSelectHandler} />
      </div>
    );
  };
  onSelectHandler = () => {
    alert(`clicked ticket: ${this.props._id}`);
  };
}
