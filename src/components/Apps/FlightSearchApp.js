
import React from 'react'
import PageHeader from '../../components/PageHeader';
import SearchForm from '../../components/SearchForm';
import PriceSlider from '../../components/PriceSlider';
import SearchResults from '../../components/SearchResults';
import resultStore from '../../browser/stores/results';

export default class FlightSearchApp extends React.Component {
  state = {
    showPriceSlider: false
  };
  render = () => {
    return (
      <div className="flight-search-app">
        <PageHeader />
        <SearchForm />
        { this.state.showPriceSlider ? (<PriceSlider />) : (undefined) }
        <SearchResults />
      </div>
    );
  };
  componentDidMount = () => {
    this.subscribeResultStore();
  };
  componentWillUnmount = () => {
    this.unsubscribeResultStore();
  }
  subscribeResultStore = () => {
    this.unsubscribeResultStore = resultStore.subscribe(() => {
      let results = resultStore.getState();
      this.onResultStoreChange(results);
    });
  };
  onResultStoreChange = (results = {}) => {
    return this.setState({ showPriceSlider: results.tickets && results.tickets.length > 0 });
  };
}
