
import _ from 'lodash';
import React from 'react';
import ResultItem from '../../components/SearchResults/ResultItem';

export default class ResultList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    filter: React.PropTypes.object.isRequired
  };
  render = () => {
    let items = _.chain(this.props.items)
      .filter(item => {
        return item.price.value >= this.props.filter.min &&
          (!this.props.filter.max || item.price.value <= this.props.filter.max);
      })
      .map(item => {
        return (<ResultItem key={item._id} {...item} />)
      })
      .value();
    return (
      <div className="result-list">{ items }</div>
    );
  };
}
