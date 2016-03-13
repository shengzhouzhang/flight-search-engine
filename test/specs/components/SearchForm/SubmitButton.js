
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SubmitButton from '../../../../src/components/SearchForm/SubmitButton';

describe('SubmitButton Component', () => {

  describe('render function', () => {

    it('should show the search text', () => {
      const PROPS = {
        onSubmit: sinon.spy()
      };
      let wrapper = shallow(<SubmitButton {...PROPS} />);
      expect(wrapper.text()).to.eql('search');
      expect(wrapper.prop('onClick')).to.eql(wrapper.instance().onClickHandler);
    });

    it('should have the submit-button class', () => {
      const PROPS = {
        onChange: sinon.spy()
      };
      let wrapper = shallow(<SubmitButton {...PROPS} />);
      expect(wrapper.hasClass('submit-button')).to.eql(true);
    });
  });

  describe('onClickHandler function', () => {

    it('should trigger onSubmit handler', () => {
      const PROPS = {
        onSubmit: sinon.spy()
      };
      const TEST_EVENT = { preventDefault: sinon.spy() };
      let wrapper = shallow(<SubmitButton {...PROPS} />);
      wrapper.instance().onClickHandler(TEST_EVENT);
      expect(TEST_EVENT.preventDefault.called).to.eql(true);
      expect(PROPS.onSubmit.called).to.eql(true);
    });
  });
});
