
import React from 'react';
import ReactSlider from 'react-slider';

export default class PriceSlider extends React.Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number.isRequired
  };
  static defaultProps = {
    min: 0
  };
  render = () => {
    return (
      <div className="price-slider">
        <ReactSlider defaultValue={[ this.props.min, this.props.max ]} withBars={true}
          onChange={this.onChangeHandler} />
      </div>
    );
  };
  onChangeHandler = (data) => {
    console.log(data);
  };
}
