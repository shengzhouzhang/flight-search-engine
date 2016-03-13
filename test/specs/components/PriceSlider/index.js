
import _ from 'lodash';
import React from 'react';
import Promise from 'bluebird';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ReactSlider from 'react-slider';
import PriceSlider from '../../../../src/components/PriceSlider';

describe('PriceSlider Component', () => {

  describe('render function', () => {

    it('should render title', () => {
      const PROPS = {
        onFilter: sinon.spy(),
        max: 0,
        symbol: '',
        values: [ 0, 0 ]
      };
      let wrapper = shallow(<PriceSlider {...PROPS} />);
      expect(wrapper.contains(<h5>refine flight search</h5>)).to.eql(true);
    });

    it('should render labels', () => {
      const PROPS = {
        onFilter: sinon.spy(),
        max: 0,
        symbol: '',
        values: [ 0, 0 ]
      };
      let wrapper = shallow(<PriceSlider {...PROPS} />);
      expect(wrapper.contains(<label className="min-price">{ `${PROPS.symbol}${0}` }</label>)).to.eql(true);
      expect(wrapper.contains(<label className="max-price">{ `${PROPS.symbol}${PROPS.max}` }</label>)).to.eql(true);
    });

    it('should render react slider', () => {
      const PROPS = {
        onFilter: sinon.spy(),
        max: 0,
        symbol: '',
        values: [ 0, 0 ]
      };
      let wrapper = shallow(<PriceSlider {...PROPS} />);
      expect(wrapper.find(ReactSlider)).to.have.length(1);
      expect(wrapper.find(ReactSlider).prop('min')).to.eql(0);
      expect(wrapper.find(ReactSlider).prop('max')).to.eql(PROPS.max);
      expect(wrapper.find(ReactSlider).prop('value')).to.eql(PROPS.values);
      expect(wrapper.find(ReactSlider).prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
      expect(wrapper.find(ReactSlider).contains(<div className="custom-handle">{ PROPS.values[0] }</div>)).to.eql(true);
      expect(wrapper.find(ReactSlider).contains(<div className="custom-handle">{ PROPS.values[1] }</div>)).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should call onFilter function', () => {
      const TEST_VALUES = [ 0, 200 ];
      const PROPS = {
        onFilter: sinon.spy(),
        max: 0,
        symbol: '',
        values: [ 0, 0 ]
      };
      let wrapper = shallow(<PriceSlider {...PROPS} />);
      let result = wrapper.instance().onChangeHandler(TEST_VALUES);
      expect(PROPS.onFilter.called).to.eql(true);
      expect(PROPS.onFilter.getCall(0).args[0]).to.eql({ min: TEST_VALUES[0], max: TEST_VALUES[1] });
    });
  });
});
