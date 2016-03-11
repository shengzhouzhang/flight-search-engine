
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Price from '../../../../src/components/SearchResults/Price';

describe('Price Component', () => {

  it('should show the price and symbol', () => {
    const TEST_PRICE = { value: 125, symbol: '£' };
    let wrapper = shallow(<Price {...TEST_PRICE} />);
    expect(wrapper.text()).to.eql(`${TEST_PRICE.symbol} ${TEST_PRICE.value}`);
  });

  it('should have the price class name', () => {
    const TEST_PRICE = { value: 125, symbol: '£' };
    let wrapper = shallow(<Price {...TEST_PRICE} />);
    expect(wrapper.hasClass('price')).to.eql(true);
  });
});
