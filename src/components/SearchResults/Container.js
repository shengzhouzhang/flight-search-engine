
import React from 'react';
import moment from 'moment';
import ResultList from '../../components/SearchResults/ResultList';
import resultStore from '../../browser/stores/results';

export default class Container extends React.Component {
  state = {
    result: resultStore.getState()
  };
  render = () => {
    let query = this.state.result && this.state.result.searchQuery || null;
    let items = this.state.result && this.state.result.tickets || null;
    return (
      <div className="search-results">
        { query ? (<Header query={query} />) : (undefined) }
        { items ? (<ResultList items={items} />) : (undefined) }
      </div>
    );
  };
  componentDidMount = () => {
    this.subscribeResultStore();
  };
  componentWillUnmount = () => {
    this.unsubscribeResultStore();
  };
  subscribeResultStore = () => {
    this.unsubscribeResultStore = resultStore.subscribe(() => {
      let result = resultStore.getState();
      this.onResultStoreChange(result);
    });
  };
  onResultStoreChange = (result = {}) => {
    this.setState({ result });
  };
}

export class Header extends React.Component {
  static propTypes = {
    query: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className="result-header">
        <h4 className="header">your results</h4>
        <SearchQuery {...this.props.query} />
      </div>
    );
  };
}

export class SearchQuery extends React.Component {
  static propTypes = {
    departureDate: React.PropTypes.string.isRequired,
    returnDate: React.PropTypes.string,
  };
  render = () => {
    return (
      <div className="search-query">
        <div className="departure-date">{ `depart: ${moment(this.props.departureDate, 'YYYY-MM-DD').format('Do MMM YYYY')}` }</div>
        {
          this.props.returnDate ?
            (<div className="return-date">{ `return: ${moment(this.props.returnDate, 'YYYY-MM-DD').format('Do MMM YYYY')}` }</div>) :
            (undefined)
        }
      </div>
    );
  };
}
