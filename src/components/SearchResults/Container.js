
import React from 'react';
import moment from 'moment';
import ResultList from '../../components/SearchResults/ResultList';
import resultStore from '../../browser/stores/results';

export default class Container extends React.Component {
  state = {
    result: resultStore.getState()
  };
  render = () => {
    let query = this.state.result && this.state.result.query || null;
    let items = this.state.result && this.state.result.items || null;
    return (
      <div className="search-results">
        <Header />
        { query ? (<SearchQuery {...query} />) : (undefined) }
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
  render = () => {
    return (<h4 className="header">your results</h4>);
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
        <div className="departure-date">{ moment(this.props.departureDate, 'YYYY-MM-DD').format('Do MMM YYYY') }</div>
        {
          this.props.returnDate ?
            (<div className="return-date">{ moment(this.props.returnDate, 'YYYY-MM-DD').format('Do MMM YYYY') }</div>) :
            (undefined)
        }
      </div>
    );
  };
}
