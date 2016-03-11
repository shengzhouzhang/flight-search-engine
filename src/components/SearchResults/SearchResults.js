
import React from 'react';
import moment from 'moment';
import ResultList from '../../components/SearchResults/ResultList';

export default class SearchResults extends React.Component {
  static propTypes = {
    query: React.PropTypes.object.isRequired,
    results: React.PropTypes.array.isRequired,
  };
  render = () => {
    return (
      <div className="search-results">
        <Header />
        <SearchQuery {...this.props.query} />
        <ResultList items={this.props.results} />
      </div>
    );
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
