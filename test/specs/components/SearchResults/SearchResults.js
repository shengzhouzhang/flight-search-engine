
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ResultList from '../../../../src/components/SearchResults/ResultList';
import SearchResults, { SearchQuery } from '../../../../src/components/SearchResults/SearchResults';

describe('Search Results Component', () => {

  it('should show title, query, and result list', () => {
    const SEARCH_RESULTS_PROPS = {
      query: { departureDate: moment().valueOf(), returnDate: moment().valueOf() },
      results: [ {
        _id: 'TEST_ID',
        airline: { logoUri: 'LOGO_URI' },
        flight: {
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
          arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
        },
        return: {
          number: 'AI-203',
          from: 'PNQ',
          destination: 'DEL',
          depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
          arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
        },
        price: { symbol: '£', value: 125 },
        onSelect: sinon.spy()
      } ]
    };
    let wrapper = shallow(<SearchResults {...SEARCH_RESULTS_PROPS} />);
    expect(wrapper.contains(<h4>Your Results</h4>)).to.eql(true);
    expect(wrapper.contains(<SearchQuery {...SEARCH_RESULTS_PROPS.query} />)).to.eql(true);
    expect(wrapper.contains(<ResultList items={SEARCH_RESULTS_PROPS.results} />)).to.eql(true);
  });

  it('should have the search-results class name', () => {
    const SEARCH_RESULTS_PROPS = {
      query: { departureDate: moment().valueOf(), returnDate: moment().valueOf() },
      results: [ {
        _id: 'TEST_ID',
        airline: { logoUri: 'LOGO_URI' },
        flight: {
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
          arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
        },
        return: {
          number: 'AI-203',
          from: 'PNQ',
          destination: 'DEL',
          depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
          arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
        },
        price: { symbol: '£', value: 125 },
        onSelect: sinon.spy()
      } ]
    };
    let wrapper = shallow(<SearchResults {...SEARCH_RESULTS_PROPS} />);
    expect(wrapper.hasClass('search-results')).to.eql(true);
  });
});
