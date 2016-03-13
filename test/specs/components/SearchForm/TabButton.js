
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TabButton from '../../../../src/components/SearchForm/TabButton';

describe('TabButton Component', () => {

  describe('render function', () => {

    it('should show the tab name and add onClickHandler', () => {
      const PROPS = {
        name: 'tab-name',
        selected: false,
        onSelect: sinon.spy()
      };
      let wrapper = shallow(<TabButton {...PROPS} />);
      expect(wrapper.text()).to.eql(PROPS.name);
      expect(wrapper.prop('onClick')).to.eql(wrapper.instance().onClickHandler);
    });

    it('should have the tab-button class', () => {
      const PROPS = {
        name: 'tab-name',
        selected: false,
        onSelect: sinon.spy()
      };
      let wrapper = shallow(<TabButton {...PROPS} />);
      expect(wrapper.hasClass('tab-button')).to.eql(true);
      expect(wrapper.hasClass('selected')).to.eql(false);
    });

    it('should have the tab-button and selected class', () => {
      const PROPS = {
        name: 'tab-name',
        selected: true,
        onSelect: sinon.spy()
      };
      let wrapper = shallow(<TabButton {...PROPS} />);
      expect(wrapper.hasClass('tab-button')).to.eql(true);
      expect(wrapper.hasClass('selected')).to.eql(true);
    });
  });

  describe('onClickHandler function', () => {

    it('should trigger onSelect handler', () => {
      const PROPS = {
        name: 'tab-name',
        selected: true,
        onSelect: sinon.spy()
      };
      const TEST_EVENT = {
        preventDefault: sinon.spy()
      };
      let wrapper = shallow(<TabButton {...PROPS} />);
      wrapper.instance().onClickHandler(TEST_EVENT);
      expect(TEST_EVENT.preventDefault.called).to.eql(true);
      expect(PROPS.onSelect.called).to.eql(true);
    });
  });
});
