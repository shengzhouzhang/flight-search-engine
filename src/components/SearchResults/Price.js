
import React from 'react';

export default class Price extends React.Component {
  static propTypes = {
    symbol: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  };
  render = () => {
    return (<div className="price">{ `${this.props.symbol}${this.props.value.toFixed(2)}` }</div>);
  };
}
