
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SelectButton from '../../../../src/components/SearchResults/SelectButton';

describe('SelectButton Component', () => {

  describe('render function', () => {

    it('should show button text', () => {
      const TEST_ON_SELECT_HANDLER = sinon.spy();
      let wrapper = shallow(<SelectButton onSelect={TEST_ON_SELECT_HANDLER} />);
      expect(wrapper.text()).to.eql('select this flight');
    });

    it('should have the select-button class', () => {
      const TEST_ON_SELECT_HANDLER = sinon.spy();
      let wrapper = shallow(<SelectButton onSelect={TEST_ON_SELECT_HANDLER} />);
      expect(wrapper.hasClass('select-button')).to.eql(true);
    });

    it('should add onClick handler', () => {
      const TEST_ON_SELECT_HANDLER = sinon.spy();
      let wrapper = shallow(<SelectButton onSelect={TEST_ON_SELECT_HANDLER} />);
      expect(wrapper.prop('onClick')).to.eql(wrapper.instance().onClickHandler);
    });
  });

  describe('onClickHandler function', () => {

    it('should trigger onSelect handler', () => {
      const TEST_ON_SELECT_HANDLER = sinon.spy();
      const TEST_PREVENT_DEFAULT = sinon.spy();
      let wrapper = shallow(<SelectButton onSelect={TEST_ON_SELECT_HANDLER} />);
      wrapper.instance().onClickHandler({ preventDefault: TEST_PREVENT_DEFAULT })
      expect(TEST_PREVENT_DEFAULT.called).to.eql(true);
      expect(TEST_ON_SELECT_HANDLER.called).to.eql(true);
    });
  });

});
