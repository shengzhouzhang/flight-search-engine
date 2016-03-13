
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

    it('should render page header, search form, price slider, and search results', () => {
      let wrapper = shallow(<FlightSearchApp />);
      expect(wrapper.contains(<PageHeader />)).to.eql(true);
      expect(wrapper.contains(<SearchForm />)).to.eql(true);
      expect(wrapper.contains(<PriceSlider />)).to.eql(true);
      expect(wrapper.contains(<SearchResults />)).to.eql(true);
    });

    it('should have the flight-search-app class', () => {
      let wrapper = shallow(<FlightSearchApp />);
      expect(wrapper.hasClass('flight-search-app')).to.eql(true);
    });
  });

  // describe('componentDidMount function', () => {
  //
  //   it('should call subscribeResultStore function', () => {
  //     let wrapper = shallow(<PriceSlider />);
  //     wrapper.instance().subscribeResultStore = sinon.spy();
  //     wrapper.instance().componentDidMount();
  //     expect(wrapper.instance().subscribeResultStore.called).to.eql(true);
  //   });
  // });
  //
  // describe('componentWillUnmount function', () => {
  //
  //   it('should call unsubscribeResultStore function', () => {
  //     let wrapper = shallow(<PriceSlider />);
  //     wrapper.instance().unsubscribeResultStore = sinon.spy();
  //     wrapper.instance().componentWillUnmount();
  //     expect(wrapper.instance().unsubscribeResultStore.called).to.eql(true);
  //   });
  // });
  //
  // describe('getAdjustedMaxValue function', () => {
  //
  //   it('should return an interger larger then the max price of tickets', () => {
  //     const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
  //     let wrapper = shallow(<PriceSlider />);
  //     let result = wrapper.instance().getAdjustedMaxValue(TEST_RESULT.tickets);
  //     _.forEach(TEST_RESULT.tickets, ticket => expect(ticket.price.value <= result));
  //   });
  // });

  // describe('onResultStoreChange function', () => {
  //
  //   it('should update state', () => {
  //     const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
  //     const MAX_PRICE = 200;
  //     let wrapper = shallow(<PriceSlider />);
  //     wrapper.instance().setState = sinon.spy();
  //     wrapper.instance().getAdjustedMaxValue = sinon.stub().returns(MAX_PRICE);
  //     wrapper.instance().onResultStoreChange(TEST_RESULT);
  //     expect(wrapper.instance().getAdjustedMaxValue.called).to.eql(true);
  //     expect(wrapper.instance().getAdjustedMaxValue.getCall(0).args[0]).to.eql(TEST_RESULT.tickets);
  //     expect(wrapper.instance().setState.called).to.eql(true);
  //     expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
  //       hidden: false,
  //       max: MAX_PRICE,
  //       symbol: '£',
  //       values: [ 0, MAX_PRICE ]
  //     });
  //   });
  // });

  // describe('subscribeResultStore function', () => {
  //
  //   it('should subscribe to result store', () => {
  //     const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
  //     let wrapper = shallow(<PriceSlider />);
  //     wrapper.instance().onResultStoreChange = sinon.spy();
  //     wrapper.instance().subscribeResultStore();
  //     resultStore.dispatch({ type: 'UPDATE', result: TEST_RESULT });
  //
  //     expect(wrapper.instance().unsubscribeResultStore).to.not.eql(undefined);
  //     expect(wrapper.instance().onResultStoreChange.called).to.eql(true);
  //     expect(wrapper.instance().onResultStoreChange.getCall(0).args[0]).to.eql(TEST_RESULT);
  //     wrapper.instance().unsubscribeResultStore();
  //   });
  // });
});
