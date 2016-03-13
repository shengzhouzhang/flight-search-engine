
import _ from 'lodash';
import React from 'react';
import ReactSlider from 'react-slider';

export default class PriceSlider extends React.Component {
  static propTypes = {
    onFilter: React.PropTypes.func.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number.isRequired,
    symbol: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    min: 0
  };
  render = () => {
    return (
      <div className="price-slider">
        <h5>refine flight search</h5>
        <div className="price-labels">
          <label className="min-price">{ `${this.props.symbol}${this.props.min}` }</label>
          <label className="max-price">{ `${this.props.symbol}${this.props.max}` }</label>
        </div>
        <ReactSlider min={this.props.min} max={this.props.max}
          value={this.props.values} withBars={true}
          minDistance={10} pearling={true}
          onChange={this.onChangeHandler} >
          <div className="custom-handle">{ this.props.values[0] }</div>
          <div className="custom-handle">{ this.props.values[1] }</div>
        </ReactSlider>
      </div>
    );
  };
  onChangeHandler = (values) => {
    this.props.onFilter({ min: values[0], max: values[1] });
  };
}
