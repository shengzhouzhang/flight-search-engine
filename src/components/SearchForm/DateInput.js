
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';

export default class DateInput extends React.Component {
  static propTypes = {
    fieldName: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    hasError: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (
      <div className={`date-input form-item ${this.props.fieldName} ${this.props.hasError ? 'error' : ''}`}>
        <label>{ `${this.props.displayName} *` }</label>
        <DatePicker selected={moment(this.props.value, 'YYYY-MM-DD')}
          onChange={this.onChangeHandler} dateFormat="DD/MM/YYYY" />
      </div>
    );
  };
  onChangeHandler = (date) => {
    this.props.onChange(this.props.fieldName, date.format('YYYY-MM-DD'));
  };
}
