
import _ from 'lodash';
import React from 'react';
import ResultItem from '../../components/SearchResults/ResultItem';
import filterStore from '../../browser/stores/filter';

export default class ResultList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired
  };
  state = {
    filter: filterStore.getState()
  };
  render = () => {
    let items = _.chain(this.props.items)
      .filter(item => {
        return item.price.value >= this.state.filter.min &&
          (!this.state.filter.max || item.price.value <= this.state.filter.max);
      })
      .map(item => {
        return (<ResultItem key={item._id} {...item} />)
      })
      .value();
    return (
      <div className="result-list">{ items }</div>
    );
  };
  componentDidMount = () => {
    this.subscribeFilterStore();
  };
  componentWillUnmount = () => {
    this.unsubscribeFilterStore();
  };
  subscribeFilterStore = () => {
    this.unsubscribeFilterStore = filterStore.subscribe(() => {
      let filter = filterStore.getState();
      this.onFilterStoreChange(filter);
    });
  };
  onFilterStoreChange = (filter = {}) => {
    this.setState({ filter });
  };
}
