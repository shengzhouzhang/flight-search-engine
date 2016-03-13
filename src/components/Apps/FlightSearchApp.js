
import React from 'react'
import PageHeader from '../../components/PageHeader';
import SearchForm from '../../components/SearchForm';
import PriceSlider from '../../components/PriceSlider';
import SearchResults from '../../components/SearchResults';
import filterStore from '../../browser/stores/filter';
import resultStore from '../../browser/stores/results';

export default class FlightSearchApp extends React.Component {
  static propTypes = {
    ticketRepository: React.PropTypes.object.isRequired
  };
  render = () => {
    return (
      <div className="flight-search-app">
        <PageHeader />
        <div className="sidebar">
          <SearchForm onSearch={this.onSearchHandler} />
          <PriceSlider />
        </div>
        <SearchResults />
      </div>
    );
  };
  onSearchHandler = (searchQuery) => {
    return this.props.ticketRepository.search(searchQuery)
      .then(result => {
        filterStore.dispatch({ type: 'RESET' })
        resultStore.dispatch({ type: 'UPDATE', result: result })
      })
      .catch(err => {
        console.error(err.stack)
      });
  };
}
