
import _ from 'lodash';
import React from 'react';
import Promise from 'bluebird';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ReactSlider from 'react-slider';
import PriceSlider from '../../../../src/components/PriceSlider';
import resultStore from '../../../../src/browser/stores/results';
import filterStore from '../../../../src/browser/stores/filter';

import ticketTypes from '../../../../src/config/ticketTypes';
import { genSearchResults } from '../../../utils/gen';

describe('PriceSlider Component', () => {

  describe('initial state', () => {

    it('should have the min, max, values, symbol, hidden state', () => {
      const STATE = {
        min: 0,
        max: 10,
        hidden: true,
        values: [ 0, 10 ],
        symbol: ''
      };
      let wrapper = shallow(<PriceSlider />);
      expect(wrapper.instance().state).to.eql(STATE);
    });
  });

  describe('render function', () => {

    it('should render title', () => {
      let wrapper = shallow(<PriceSlider />);
      expect(wrapper.contains(<h5>refine flight search</h5>)).to.eql(true);
    });

    it('should render labels', () => {
      const DEFAULT_STATE = {
        min: 0,
        max: 10,
        hidden: false,
        values: [ 0, 10 ],
        symbol: ''
      };
      let wrapper = shallow(<PriceSlider />);
      expect(wrapper.contains(<label className="min-price">{ `${DEFAULT_STATE.symbol}${DEFAULT_STATE.min}` }</label>)).to.eql(true);
      expect(wrapper.contains(<label className="max-price">{ `${DEFAULT_STATE.symbol}${DEFAULT_STATE.max}` }</label>)).to.eql(true);
    });

    it('should render react slider', () => {
      const DEFAULT_STATE = {
        min: 0,
        max: 10,
        hidden: false,
        values: [ 0, 10 ],
        symbol: ''
      };
      let wrapper = shallow(<PriceSlider />);
      expect(wrapper.find(ReactSlider)).to.have.length(1);
      expect(wrapper.find(ReactSlider).prop('min')).to.eql(DEFAULT_STATE.min);
      expect(wrapper.find(ReactSlider).prop('max')).to.eql(DEFAULT_STATE.max);
      expect(wrapper.find(ReactSlider).prop('value')).to.eql(DEFAULT_STATE.values);
      expect(wrapper.find(ReactSlider).prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
      expect(wrapper.find(ReactSlider).contains(<div className="custom-handle">{ DEFAULT_STATE.values[0] }</div>)).to.eql(true);
      expect(wrapper.find(ReactSlider).contains(<div className="custom-handle">{ DEFAULT_STATE.values[1] }</div>)).to.eql(true);
    });
  });

  describe('componentDidMount function', () => {

    it('should call subscribeResultStore function', () => {
      let wrapper = shallow(<PriceSlider />);
      wrapper.instance().subscribeResultStore = sinon.spy();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().subscribeResultStore.called).to.eql(true);
    });
  });

  describe('componentWillUnmount function', () => {

    it('should call unsubscribeResultStore function', () => {
      let wrapper = shallow(<PriceSlider />);
      wrapper.instance().unsubscribeResultStore = sinon.spy();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().unsubscribeResultStore.called).to.eql(true);
    });
  });

  describe('subscribeResultStore function', () => {

    it('should subscribe to result store', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      let wrapper = shallow(<PriceSlider />);
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
      let wrapper = shallow(<PriceSlider />);
      wrapper.instance().setState = sinon.spy();
      wrapper.instance().getAdjustedMaxValue = sinon.stub().returns(MAX_PRICE);
      wrapper.instance().onResultStoreChange(TEST_RESULT);
      expect(wrapper.instance().getAdjustedMaxValue.called).to.eql(true);
      expect(wrapper.instance().getAdjustedMaxValue.getCall(0).args[0]).to.eql(TEST_RESULT.tickets);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({
        hidden: false,
        max: MAX_PRICE,
        symbol: '£',
        values: [ 0, MAX_PRICE ]
      });
    });
  });

  describe('getAdjustedMaxValue function', () => {

    it('should return an interger larger then the max price of tickets', () => {
      const TEST_RESULT = genSearchResults(ticketTypes.RETURN, 10);
      let wrapper = shallow(<PriceSlider />);
      let result = wrapper.instance().getAdjustedMaxValue(TEST_RESULT.tickets);
      _.forEach(TEST_RESULT.tickets, ticket => expect(ticket.price.value <= result));
    });
  });

  describe('onChangeHandler function', () => {

    it('should update state and filter store', () => {
      const TEST_VALUES = [ 0, 200 ];
      let wrapper = shallow(<PriceSlider />);
      wrapper.instance().setState = sinon.spy();
      let onFilterStoreChange = sinon.spy();
      let unsubscribe = filterStore.subscribe(() => {
        let filter = filterStore.getState();
        onFilterStoreChange(filter);
      });
      let result = wrapper.instance().onChangeHandler(TEST_VALUES);
      expect(wrapper.instance().setState.called).to.eql(true);
      expect(wrapper.instance().setState.getCall(0).args[0]).to.eql({ values: TEST_VALUES });
      expect(onFilterStoreChange.called).to.eql(true);
      expect(onFilterStoreChange.getCall(0).args[0]).to.eql({ min: TEST_VALUES[0], max: TEST_VALUES[1] });
      unsubscribe();
    });
  });
});
