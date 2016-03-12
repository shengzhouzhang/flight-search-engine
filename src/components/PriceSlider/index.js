
import React from 'react';
import ReactSlider from 'react-slider';
import resultStore from '../../browser/stores/results';

export default class PriceSlider extends React.Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number.isRequired
  };
  static defaultProps = {
    min: 0,
    max: 0
  };
  state = {
    min: this.props.min,
    max: this.props.max,
    hidden: true
  };
  render = () => {
    return (
      <div className="price-slider">
        <ReactSlider defaultValue={[ this.props.min, this.props.max ]} withBars={true}
          onChange={this.onChangeHandler} />
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
    let maxPrice = _.maxBy(result.items, item => item.price.value);
    return this.setState({ hidden: result.items && result.items.length > 0, max: maxPrice && maxPrice.value || 0 });
  };
  onChangeHandler = (data) => {
    console.log(data);
  };
}
