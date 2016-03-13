
import React from 'react';

export default class NumericInput extends React.Component {
  static propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    hasError: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (
      <div className={`numeric-input form-item ${this.props.fieldName} ${this.props.hasError ? 'error' : ''}`}>
        <label>{ this.props.displayName }</label>
        <input type="number" value={this.props.value} min="1" onChange={this.onChangeHandler} />
      </div>
    );
  };
  onChangeHandler = (event) => {
    this.props.onChange(this.props.fieldName, parseInt(event.target.value) || 0);
  };
}
