
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
      <div className={`search-result-item ${ this.props.return ? 'return' : 'one-way'}`}>
        <FlightDetails {...this.props.flight} />
        { !!this.props.return ? (<FlightDetails {...this.props.return} />) : (undefined) }
      </div>
    );
  };
}
