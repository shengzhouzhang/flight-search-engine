
import React from 'react';
import ReactSlider from 'react-slider';
import resultStore from '../../browser/stores/results';

export default class PriceSlider extends React.Component {
  state = {
    min: 0,
    max: 10,
    hidden: true,
    values: [ 0, 10 ],
    symbol: ''
  };
  render = () => {
    return (
      <div className={`price-slider ${this.state.hidden ? 'hidden' : 'shown'}`}>
        <h5>refine flight search</h5>
        <div className="price-labels">
          <label className="min-price">{ `${this.state.symbol}${this.state.min}` }</label>
          <label className="max-price">{ `${this.state.symbol}${this.state.max}` }</label>
        </div>
        <ReactSlider min={this.state.min} max={this.state.max}
          value={this.state.values} withBars={true}
          minDistance={10} pearling={true}
          onChange={this.onChangeHandler} >
          <div className="custom-handle">{ this.state.values[0] }</div>
          <div className="custom-handle">{ this.state.values[1] }</div>
        </ReactSlider>
      </div>
    );
  };
  componentDidMount = () => {
    this.subscribeResultStore();
  };
  componentWillUnmount = () => {
    this.unsubscribeResultStore();
  }
  subscribeResultStore = () => {
    this.unsubscribeResultStore = resultStore.subscribe(() => {
      let result = resultStore.getState();
      this.onResultStoreChange(result);
    });
  };
  onResultStoreChange = (result = {}) => {
    let maxPriceTicket = _.maxBy(result.items, item => item.price.value);
    let maxPrice = maxPriceTicket && maxPriceTicket.price || undefined;
    let maxValue = maxPrice && maxPrice.value || 0;
    return this.setState({
      hidden: !result.items || result.items.length === 0,
      max: maxValue,
      symbol: maxPrice.symbol,
      values: [ 0, maxValue ]
    });
  };
  onChangeHandler = (values) => {
    this.setState({ values: values });
  };
}
