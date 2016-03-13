
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Price from '../../../../src/components/SearchResults/Price';
import { randomPrice } from '../../../utils/gen';

describe('Price Component', () => {

  describe('render function', () => {

    it('should show the price and symbol', () => {
      const PROPS = randomPrice();
      let wrapper = shallow(<Price {...PROPS} />);
      expect(wrapper.text()).to.eql(`${PROPS.currency.symbol}${PROPS.value}.00`);
    });

    it('should have the price class', () => {
      const PROPS = randomPrice();
      let wrapper = shallow(<Price {...PROPS} />);
      expect(wrapper.hasClass('price')).to.eql(true);
    });
  });
});
