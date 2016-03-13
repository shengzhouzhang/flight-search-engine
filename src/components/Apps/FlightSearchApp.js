
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
  state = {
    showPriceSlider: false,
    showSearchResult: false,
    result: resultStore.getState(),
    filter: filterStore.getState(),
    slider: {
      max: 0,
      symbol: '',
      values: [ 0, 0 ]
    }
  };
  render = () => {
    return (
      <div className="flight-search-app">
        <PageHeader />
        <div className="sidebar">
          <SearchForm onSearch={this.onSearchHandler} />
          { this.state.showPriceSlider ? (<PriceSlider {...this.state.slider} onFilter={this.onFilterHandler} />) : (undefined) }
        </div>
        { this.state.showSearchResult ? (<SearchResults result={this.state.result} filter={this.state.filter} />) : (undefined) }
      </div>
    );
  };
  componentDidMount = () => {
    this.subscribeResultStore();
    this.subscribeFilterStore();
  };
  componentWillUnmount = () => {
    this.unsubscribeResultStore();
    this.unsubscribeFilterStore();
  };
  subscribeResultStore = () => {
    this.unsubscribeResultStore = resultStore.subscribe(() => {
      let result = resultStore.getState();
      this.onResultStoreChange(result);
    });
  };
  onResultStoreChange = (result = {}) => {
    let adjustedMaxValue = this.getAdjustedMaxValue(result.tickets);
    let symbol = result.searchQuery.currency.symbol;
    return this.setState({
      result: result,
      slider: {
        max: adjustedMaxValue,
        symbol: symbol,
        values: [ 0, adjustedMaxValue ]
      },
      showPriceSlider: result.tickets && result.tickets.length > 0,
      showSearchResult: true
    });
  };
  getAdjustedMaxValue = (tickets) => {
    let maxPriceTicket = _.maxBy(tickets, ticket => ticket.price.value);
    let maxPrice = maxPriceTicket && maxPriceTicket.price || undefined;
    let maxValue = maxPrice && maxPrice.value || 0;
    return maxValue && Math.ceil(maxValue / 100) * 100 || 0;
  };
  subscribeFilterStore = () => {
    this.unsubscribeFilterStore = filterStore.subscribe(() => {
      let filter = filterStore.getState();
      this.onFilterStoreChange(filter);
    });
  };
  onFilterStoreChange = (filter = {}) => {
    this.setState({
      filter: filter,
      slider: {
        max: this.state.slider.max,
        symbol: this.state.slider.symbol,
        values: [ filter.min, filter.max || this.state.slider.max ]
      }
    });
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
  onFilterHandler = (filter) => {
    filterStore.dispatch({ type: 'UPDATE', filter: filter });
  };
}
