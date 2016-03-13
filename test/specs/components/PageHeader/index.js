
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PageHeader from '../../../../src/components/PageHeader';

describe('PageHeader Component', () => {

  describe('render function', () => {

    it('should render page title', () => {
      let wrapper = shallow(<PageHeader />);
      expect(wrapper.text()).to.eql('flight search engine');
    });

    it('should have the page-header class', () => {
      let wrapper = shallow(<PageHeader />);
      expect(wrapper.hasClass('page-header')).to.eql(true);
    });
  });
});
