
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ReactSlider from 'react-slider';
import PriceSlider from '../../../../src/components/PriceSlider';

describe('PriceSlider Component', () => {

  describe('initial props', () => {

    it('should have the min and max values', () => {
      const TEST_PROPS = {
        min: 10,
        max: 100
      };
      let wrapper = shallow(<PriceSlider {...TEST_PROPS} />);
      expect(wrapper.instance().props).to.eql(TEST_PROPS);
    });

    it('should use default min value when min not provided', () => {
      const TEST_PROPS = {
        max: 100
      };
      let wrapper = shallow(<PriceSlider {...TEST_PROPS} />);
      expect(wrapper.instance().props).to.eql({ min: 0, max: 100 });
    });
  });

  describe('render function', () => {

    it('should show react slider', () => {
      const TEST_PROPS = {
        max: 100
      };
      let wrapper = shallow(<PriceSlider {...TEST_PROPS} />);
      expect(wrapper.contains(
        <ReactSlider defaultValue={[ 0, TEST_PROPS.max ]} withBars={true} onChange={wrapper.instance().onChangeHandler} />)
      ).to.eql(true);
    });

    it('should have the price-slider class', () => {
      const TEST_PROPS = {
        max: 100
      };
      let wrapper = shallow(<PriceSlider {...TEST_PROPS} />);
      expect(wrapper.hasClass('price-slider')).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

  });
});
