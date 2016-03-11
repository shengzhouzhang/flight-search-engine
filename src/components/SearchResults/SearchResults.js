
import React from 'react';
import ResultList from '../../components/SearchResults/ResultList';

export default class SearchResults extends React.Component {
  static propTypes = {
    query: React.PropTypes.object.isRequired,
    results: React.PropTypes.array.isRequired,
  };
  render = () => {
    return (
      <div className="search-results">
        <h4>Your Results</h4>
        <SearchQuery {...this.props.query} />
        <ResultList items={this.props.results} />
      </div>
    );
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
        <div className="return-date">{ moment(this.props.returnDate).format('Do MMM YYYY') }</div>
      </div>
    );
  };
}
