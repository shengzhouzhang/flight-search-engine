
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PageHeader from '../../../../src/components/PageHeader';
import SearchForm from '../../../../src/components/SearchForm';
import PriceSlider from '../../../../src/components/PriceSlider';
import SearchResults from '../../../../src/components/SearchResults';
import FlightSearchApp from '../../../../src/components/Apps/FlightSearchApp';

describe('FlightSearchApp Component', () => {

  describe('render function', () => {

    it('should render page header, search form, and search results', () => {
      let wrapper = shallow(<FlightSearchApp />);
      expect(wrapper.contains(<PageHeader />)).to.eql(true);
      expect(wrapper.contains(<SearchForm />)).to.eql(true);
      expect(wrapper.contains(<PriceSlider />)).to.eql(false);
      expect(wrapper.contains(<SearchResults />)).to.eql(true);
    });

    it('should have the flight-search-app class', () => {
      let wrapper = shallow(<FlightSearchApp />);
      expect(wrapper.hasClass('flight-search-app')).to.eql(true);
    });
  });
});
