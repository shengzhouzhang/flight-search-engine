
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ResultList from '../../../../src/components/SearchResults/ResultList';
import Container, { Header, SearchQuery } from '../../../../src/components/SearchResults/Container';

import ticketTypes from '../../../../src/config/ticketTypes';
import { genSearchQuery } from '../../../utils/gen';

describe('Search Results Container Component', () => {

  describe('render function', () => {

    it('should show title, query, and result list', () => {

    });

    it('should have the search-results class', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.hasClass('search-results')).to.eql(true);
    });
  });

  describe('Header Component', () => {

    describe('render function', () => {

      it('should show the title and query info', () => {
        const PROPS = { query: { departureDate: genSearchQuery(ticketTypes.ONEWAY).departureDate } }
        let wrapper = shallow(<Header {...PROPS} />);
        expect(wrapper.contains(<h4 className="header">your results</h4>)).to.eql(true);
        expect(wrapper.contains(<SearchQuery {...PROPS.query} />)).to.eql(true);
      });

      it('should have the result-header class', () => {
        const PROPS = { query: { departureDate: genSearchQuery(ticketTypes.ONEWAY).departureDate } }
        let wrapper = shallow(<Header {...PROPS} />);
        expect(wrapper.hasClass('result-header')).to.eql(true);
      });
    });
  });

  describe('SearchQuery Component', () => {

    describe('render function', () => {

      it('should show the departure date', () => {
        const PROPS = { departureDate: genSearchQuery(ticketTypes.ONEWAY).departureDate }
        let wrapper = shallow(<SearchQuery {...PROPS} />);
        expect(wrapper.find('.departure-date').text()).to.eql(`depart: ${moment(PROPS.departureDate).format('Do MMM YYYY')}`);
      });

      it('should show the departure date and return date', () => {
        const SEARCH_QUERY = genSearchQuery(ticketTypes.RETURN);
        const PROPS = {
          departureDate: SEARCH_QUERY.departureDate,
          returnDate: SEARCH_QUERY.returnDate
        };
        let wrapper = shallow(<SearchQuery {...PROPS} />);
        expect(wrapper.find('.departure-date').text()).to.eql(`depart: ${moment(PROPS.departureDate).format('Do MMM YYYY')}`);
        expect(wrapper.find('.return-date').text()).to.eql(`return: ${moment(PROPS.returnDate).format('Do MMM YYYY')}`);
      });

      it('should have the search-query class', () => {
        const PROPS = { departureDate: genSearchQuery(ticketTypes.ONEWAY).departureDate }
        let wrapper = shallow(<SearchQuery {...PROPS} />);
        expect(wrapper.hasClass('search-query')).to.eql(true);
      });
    });
  });
});
