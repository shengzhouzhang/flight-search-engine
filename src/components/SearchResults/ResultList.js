
import _ from 'lodash';
import React from 'react';
import ResultItem from '../../components/SearchResults/ResultItem';

export default class ResultList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired
  };
  render = () => {
    let items = _.map(this.props.items, item => {
      return (<ResultItem key={item._id} {...item} />)
    });
    return (
      <div className="result-list">{ items }</div>
    );
  }
}
