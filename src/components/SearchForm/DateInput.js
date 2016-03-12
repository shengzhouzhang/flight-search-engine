
import React from 'react';

export default class DateInput extends React.Component {
  static propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (
      <div className="date-input form-item">
        <label>{ this.props.displayName }</label>
        <input type="date" onChange={this.onChangeHandler} />
      </div>
    );
  };
  onChangeHandler = (event) => {
    let fields = {};
    fields[this.props.fieldName] = event.target.value;
    this.props.onChange(fields);
  };
}
