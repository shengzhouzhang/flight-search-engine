
import _ from 'lodash';
import React from 'react';

export default class SubmitButton extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  };
  render = () => {
    return (<button className="submit-button" type="submit" onClick={this.onClickHandler}>search</button>);
  };
  onClickHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };
}
