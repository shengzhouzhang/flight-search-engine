
import React from 'react';

export default class Price extends React.Component {
  static propTypes = {
    currency: React.PropTypes.object.isRequired,
    value: React.PropTypes.number.isRequired,
  };
  render = () => {
    return (<div className="price">{ `${this.props.currency.symbol}${this.props.value.toFixed(2)}` }</div>);
  };
}
