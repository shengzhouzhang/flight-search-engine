
import React from 'react';

export default class TabButton extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired
  };
  render = () => {
    return (
      <a className={`tab-button ${this.props.selected ? 'selected' : ''}`}
        onClick={this.onClickHandler}>{ this.props.name }</a>
    );
  };
  onClickHandler = (event) => {
    event.preventDefault();
    this.props.onSelect();
  };
}
