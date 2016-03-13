
import React from 'react';
import ReactSlider from 'react-slider';
import resultStore from '../../browser/stores/results';
import filterStore from '../../browser/stores/filter';

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
    let adjustedMaxValue = getAdjustedMaxValue(result.tickets);
    let symbol = result.searchQuery.currency.symbol;
    return this.setState({
      hidden: !result.tickets || result.tickets.length === 0,
      max: adjustedMaxValue,
      symbol: symbol,
      values: [ 0, adjustedMaxValue ]
    });
  };
  getAdjustedMaxValue = (tickets) => {
    let maxPriceTicket = _.maxBy(tickets, ticket => ticket.price.value);
    let maxPrice = maxPriceTicket && maxPriceTicket.price || undefined;
    let maxValue = maxPrice && maxPrice.value || 0;
    return maxValue && Math.ceil(maxValue / 100) * 100 || 0;
  };
  onChangeHandler = (values) => {
    this.setState({ values: values });
    filterStore.dispatch({ type: 'UPDATE', filter: { min: values[0], max: values[1] }});
  };
}
