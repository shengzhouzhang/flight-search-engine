
import React from 'react'
import PageHeader from '../../components/PageHeader';
import SearchForm from '../../components/SearchForm';
import PriceSlider from '../../components/PriceSlider';
import SearchResults from '../../components/SearchResults';

export default class FlightSearchApp extends React.Component {
  render = () => {
    return (
      <div className="flight-search-app">
        <PageHeader />
        <SearchForm />
        <PriceSlider />
        <SearchResults />
      </div>
    );
  };
}
