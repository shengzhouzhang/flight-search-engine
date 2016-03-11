
import React from 'react';

export default class Logo extends React.Component {
  static propTypes = {
    imageUri: React.PropTypes.string.isRequired,
  };
  render = () => {
    return (<div className="airline-logo"><img src={this.props.imageUri} /></div>);
  };
}
