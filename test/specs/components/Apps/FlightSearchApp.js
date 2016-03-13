
import _ from 'lodash';
import Promise from 'bluebird';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PageHeader from '../../../../src/components/PageHeader';
import SearchForm from '../../../../src/components/SearchForm';
import PriceSlider from '../../../../src/components/PriceSlider';
import SearchResults from '../../../../src/components/SearchResults';
import FlightSearchApp from '../../../../src/components/Apps/FlightSearchApp';

import resultStore from '../../../../src/browser/stores/results';
import filterStore from '../../../../src/browser/stores/filter';

import ticketTypes from '../../../../src/config/ticketTypes'
import { genSearchResults } from '../../../utils/gen';

describe('FlightSearchApp Component', () => {

  describe('render function', () => {

    it('should render page header, search form, price slider, and search results', () => {
      let wrapper = shallow(<FlightSearchApp />);
      expect(wrapper.find(PageHeader)).to.have.length(1);
      expect(wrapper.find(SearchForm)).to.have.length(1);
      expect(wrapper.find(PriceSlider)).to.have.length(0);
      expect(wrapper.find(SearchResults)).to.have.length(0);
    });
  });

  describe('componentDidMount function', () => {

    it('should call subscribeResultStore and subscribeFilterStore functions', () => {
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().subscribeResultStore = sinon.spy();
      wrapper.instance().subscribeFilterStore = sinon.spy();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().subscribeResultStore.called).to.eql(true);
      expect(wrapper.instance().subscribeFilterStore.called).to.eql(true);
    });
  });

  describe('componentWillUnmount function', () => {

    it('should call unsubscribeResultStore and unsubscribeFilterStore functions', () => {
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().unsubscribeResultStore = sinon.spy();
      wrapper.instance().unsubscribeFilterStore = sinon.spy();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().unsubscribeResultStore.called).to.eql(true);
      expect(wrapper.instance().unsubscribeFilterStore.called).to.eql(true);
    });
  });

  describe('subscribeResultStore function', () => {

    it('should subscribe to result store', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().onResultStoreChange = sinon.spy();
      wrapper.instance().subscribeResultStore();
      resultStore.dispatch({ type: 'UPDATE', result: TEST_RESULT });

      expect(wrapper.instance().unsubscribeResultStore).to.not.eql(undefined);
      expect(wrapper.instance().onResultStoreChange.called).to.eql(true);
      expect(wrapper.instance().onResultStoreChange.getCall(0).args[0]).to.eql(TEST_RESULT);
      wrapper.instance().unsubscribeResultStore();
    });
  });

  describe('onResultStoreChange function', () => {

    it('should update state', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      const MAX_PRICE = 200;
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().setState = sinon.spy();
      wrapper.instance().getAdjustedMaxValue = sinon.stub().returns(MAX_PRICE);
      wrapper.instance().onResultStoreChange(TEST_RESULT);
      expect(wrapper.instance().getAdjustedMaxValue.called).to.eql(true);
      expect(wrapper.instance().getAdjustedMaxValue.getCall(0).args[0]).to.eql(TEST_RESULT.tickets);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
        result: TEST_RESULT,
        slider: {
          max: MAX_PRICE,
          symbol: TEST_RESULT.searchQuery.currency.symbol,
          values: [ 0, MAX_PRICE ]
        },
        showPriceSlider: TEST_RESULT.tickets && TEST_RESULT.tickets.length > 0,
        showSearchResult: true
      });
    });
  });

  describe('getAdjustedMaxValue function', () => {

    it('should return an interger larger then the max price of tickets', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      let wrapper = shallow(<FlightSearchApp />);
      let result = wrapper.instance().getAdjustedMaxValue(TEST_RESULT.tickets);
      _.forEach(TEST_RESULT.tickets, ticket => expect(ticket.price.value <= result));
    });
  });


  describe('subscribeFilterStore function', () => {

    it('should subscribe to filter store', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().onFilterStoreChange = sinon.spy();
      wrapper.instance().subscribeFilterStore();
      filterStore.dispatch({ type: 'UPDATE', filter: TEST_RESULT });

      expect(wrapper.instance().unsubscribeFilterStore).to.not.eql(undefined);
      expect(wrapper.instance().onFilterStoreChange.called).to.eql(true);
      expect(wrapper.instance().onFilterStoreChange.getCall(0).args[0]).to.eql(TEST_RESULT);
      wrapper.instance().unsubscribeFilterStore();
    });
  });

  describe('onFilterStoreChange function', () => {

    it('should update state', () => {
      const FILTER = { min: 0, max: 100 };
      const MAX_PRICE = 200;
      let wrapper = shallow(<FlightSearchApp />);
      wrapper.instance().setState = sinon.spy();
      wrapper.instance().onFilterStoreChange(FILTER);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
        filter: FILTER,
        slider: {
          max: wrapper.instance().state.slider.max,
          symbol: wrapper.instance().state.slider.symbol,
          values: [ FILTER.min, FILTER.max || wrapper.instance().state.slider.max ]
        }
      });
    });
  });

  describe('onSearchHandler function', () => {

    it('should call ticket repository search function and dispatch actions', () => {
      const SEARCH_QUERY = 'SEARCH_QUERY';
      const RESULT = 'SEARCH_QUERY';
      const PROPS = { ticketRepository: { search: sinon.stub().returns(Promise.resolve(RESULT)) }};
      let wrapper = shallow(<FlightSearchApp />);
      let onResultStoreChange = sinon.spy();
      let onFilterStoreChange = sinon.spy();
      let unsubscribeResultStore = resultStore.subscribe(() => {
        let state = resultStore.getState();
        onResultStoreChange(state);
      });
      let unsubscribeFilterStore = filterStore.subscribe(() => {
        let state = filterStore.getState();
        onFilterStoreChange(state);
      });
      wrapper.setProps(PROPS);
      wrapper.instance().onSearchHandler(SEARCH_QUERY);
      expect(PROPS.ticketRepository.search.called).to.eql(true);
      expect(PROPS.ticketRepository.search.getCall(0).args[0]).to.eql(SEARCH_QUERY);

      return Promise.delay(10)
        .then(() => {
          expect(onResultStoreChange.called).to.eql(true);
          expect(onResultStoreChange.getCall(0).args[0]).to.eql(RESULT);
          expect(onFilterStoreChange.called).to.eql(true);
          expect(onFilterStoreChange.getCall(0).args[0]).to.eql({ min: 0, max: undefined });
          unsubscribeResultStore();
          unsubscribeFilterStore();
        });
    });
  });

  describe('onFilterHandler function', () => {

    it('should dispatch UPDATE action to filter store', () => {
      const FILTER = 'FILTER';
      let wrapper = shallow(<FlightSearchApp />);
      let onFilterStoreChange = sinon.spy();
      let unsubscribeFilterStore = filterStore.subscribe(() => {
        let state = filterStore.getState();
        onFilterStoreChange(state);
      });
      wrapper.instance().onFilterHandler(FILTER);

      return Promise.delay(10)
        .then(() => {
          expect(onFilterStoreChange.called).to.eql(true);
          expect(onFilterStoreChange.getCall(0).args[0]).to.eql(FILTER);
          unsubscribeFilterStore();
        });
    });
  });
});
