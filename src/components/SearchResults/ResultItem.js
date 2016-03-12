
import React from 'react';
import Logo from '../../components/SearchResults/Logo';
import FlightDetails from '../../components/SearchResults/FlightDetails';
import Price from '../../components/SearchResults/Price';
import SelectButton from '../../components/SearchResults/SelectButton';

export default class ResultItem extends React.Component {
  static propTypes = {
    _id: React.PropTypes.string.isRequired,
    airline: React.PropTypes.object.isRequired,
    flight: React.PropTypes.object.isRequired,
    return: React.PropTypes.object,
    price: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className={`search-result-item ${ this.props.return ? 'return' : 'one-way' }`}>
        <Logo imageUri={this.props.airline.logoUri} />
        <FlightDetails {...this.props.flight} />
        { !!this.props.return ? (<FlightDetails {...this.props.return} />) : (undefined) }
        <Price {...this.props.price} />
        <SelectButton onSelect={this.onSelectHandler} />
      </div>
    );
  };
  onSelectHandler = () => {
    console.log(this.props._id);
  };
}
