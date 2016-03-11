
import React from 'react';

export default class SelectButton extends React.Component {
  static propTypes ={
    onSelect: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (<button className="select-button"
      onClick={this.onClickHandler}>select this flight</button>);
  };
  onClickHandler = (event) => {
    event.preventDefault();
    this.props.onSelect();
  };
}
