
import React from 'react';
import moment from 'moment';
import ResultList from '../../components/SearchResults/ResultList';
import resultStore from '../../browser/stores/results';

export default class Container extends React.Component {
  state = {
    results: resultStore.getState()
  };
  render = () => {
    let query = this.state.results && this.props.results.query || null;
    let tickets = this.state.results && this.props.results.tickets || null;
    return (
      <div className="search-results">
        <Header />
        { query ? (<SearchQuery {...query} />) : (undefined) }
        { tickets ? (<ResultList items={tickets} />) : (undefined) }
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
      let results = resultStore.getState();
      this.onResultStoreChange(results);
    });
  };
  onResultStoreChange = (results = {}) => {
    this.setState({ ...results });
  };
}

export class Header extends React.Component {
  render = () => {
    return (<h4 className="header">your results</h4>);
  };
}

export class SearchQuery extends React.Component {
  static propTypes = {
    departureDate: React.PropTypes.number.isRequired,
    returnDate: React.PropTypes.number,
  };
  render = () => {
    return (
      <div className="search-query">
        <div className="departure-date">{ moment(this.props.departureDate).format('Do MMM YYYY') }</div>
        {
          this.props.returnDate ?
            (<div className="return-date">{ moment(this.props.returnDate).format('Do MMM YYYY') }</div>) :
            (undefined)
        }
      </div>
    );
  };
}
