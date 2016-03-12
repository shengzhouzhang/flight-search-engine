
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
        <div className="sidebar">
          <SearchForm />
          { this.state.showPriceSlider ? (<PriceSlider />) : (undefined) }
        </div>
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
      let result = resultStore.getState();
      this.onResultStoreChange(result);
    });
  };
  onResultStoreChange = (result = {}) => {
    return this.setState({ showPriceSlider: result.items && result.items.length > 0 });
  };
}
