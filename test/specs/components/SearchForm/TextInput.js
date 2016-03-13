
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TextInput from '../../../../src/components/SearchForm/TextInput';

describe('TextInput Component', () => {

  describe('render function', () => {

    it('should show label and input', () => {
      const TEST_PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<TextInput {...TEST_PROPS} />);
      expect(wrapper.find('label').text()).to.eql(TEST_PROPS.displayName);
      expect(wrapper.find('input').prop('type')).to.eql('text');
      expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
    });

    it('should have the text-input class', () => {
      const TEST_PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<TextInput {...TEST_PROPS} />);
      expect(wrapper.hasClass('text-input')).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should trigger onChange handler', () => {
      const TEST_PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      const TEST_TEXT = 'TEST_TEXT';
      let wrapper = shallow(<TextInput {...TEST_PROPS} />);
      wrapper.instance().onChangeHandler({ target: { value: TEST_TEXT }});
      expect(TEST_PROPS.onChange.called).to.eql(true);
      expect(TEST_PROPS.onChange.getCall(0).args[0]).to.eql({ 'field-name': TEST_TEXT });
    });
  });
});
