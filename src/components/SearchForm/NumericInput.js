
import React from 'react';

export default class NumericInput extends React.Component {
  static propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (
      <div className="numeric-input form-item">
        <label>{ this.props.displayName }</label>
        <input type="number" value={this.props.value} onChange={this.onChangeHandler} />
      </div>
    );
  };
  onChangeHandler = (event) => {
    let fields = {};
    fields[this.props.fieldName] = parseInt(event.target.value) || 0;
    this.props.onChange(fields);
  };
}
