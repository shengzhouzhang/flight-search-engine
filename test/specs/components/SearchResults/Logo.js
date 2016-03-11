
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Logo from '../../../../src/components/SearchResults/Logo';

describe('Logo Component', () => {

  it('should show logo image', () => {
    const TEST_IMAGE_URI = 'TEST_IMAGE_URI';
    let wrapper = shallow(<Logo imageUri={TEST_IMAGE_URI} />);
    expect(wrapper.contains(<img src={TEST_IMAGE_URI}/>)).to.eql(true);
  });

  it('should have the airline-logo class', () => {
    const TEST_IMAGE_URI = 'TEST_IMAGE_URI';
    let wrapper = shallow(<Logo imageUri={TEST_IMAGE_URI} />);
    expect(wrapper.hasClass('airline-logo')).to.eql(true);
  });
});
