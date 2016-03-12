
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ResultList from '../../../../src/components/SearchResults/ResultList';
import Container, { Header, SearchQuery } from '../../../../src/components/SearchResults/Container';

describe('Search Results Container Component', () => {

  it('should show title, query, and result list', () => {
    // const SEARCH_RESULTS_PROPS = {
    //   query: { departureDate: moment().valueOf(), returnDate: moment().valueOf() },
    //   results: [ {
    //     _id: 'TEST_ID',
    //     airline: { logoUri: 'LOGO_URI' },
    //     flight: {
    //       number: 'AI-202',
    //       from: 'PNQ',
    //       destination: 'DEL',
    //       depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
    //       arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
    //     },
    //     return: {
    //       number: 'AI-203',
    //       from: 'PNQ',
    //       destination: 'DEL',
    //       depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
    //       arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
    //     },
    //     price: { symbol: '£', value: 125 },
    //     onSelect: sinon.spy()
    //   } ]
    // };
    // let wrapper = shallow(<Container />);
    // expect(wrapper.contains(<Header />)).to.eql(true);
    // expect(wrapper.contains(<SearchQuery {...SEARCH_RESULTS_PROPS.query} />)).to.eql(true);
    // expect(wrapper.contains(<ResultList items={SEARCH_RESULTS_PROPS.results} />)).to.eql(true);
  });

  it('should have the search-results class', () => {
    let wrapper = shallow(<Container />);
    expect(wrapper.hasClass('search-results')).to.eql(true);
  });

  describe('Header Component', () => {

    it('should show the title', () => {
      let wrapper = shallow(<Header />);
      expect(wrapper.text()).to.eql('your results');
    });

    it('should have the header class', () => {
      let wrapper = shallow(<Header />);
      expect(wrapper.hasClass('header')).to.eql(true);
    });
  });

  describe('SearchQuery Component', () => {

    it('should show the departure date', () => {
      const SEARCH_QUERY_PROPS = {
        departureDate: moment('2014-01-01', 'YYYY-MM-DD').valueOf()
      };
      let wrapper = shallow(<SearchQuery {...SEARCH_QUERY_PROPS} />);
      expect(wrapper.find('.departure-date').text()).to.eql('1st Jan 2014');
    });

    it('should show the departure date and return date', () => {
      const SEARCH_QUERY_PROPS = {
        departureDate: moment('2014-01-01', 'YYYY-MM-DD').valueOf(),
        returnDate: moment('2014-01-10', 'YYYY-MM-DD').valueOf(),
      };
      let wrapper = shallow(<SearchQuery {...SEARCH_QUERY_PROPS} />);
      expect(wrapper.find('.departure-date').text()).to.eql('1st Jan 2014');
      expect(wrapper.find('.return-date').text()).to.eql('10th Jan 2014');
    });

    it('should have the search-query class', () => {
      const SEARCH_QUERY_PROPS = {
        departureDate: moment('2014-01-01', 'YYYY-MM-DD').valueOf()
      };
      let wrapper = shallow(<SearchQuery {...SEARCH_QUERY_PROPS} />);
      expect(wrapper.hasClass('search-query')).to.eql(true);
    });
  });
});
