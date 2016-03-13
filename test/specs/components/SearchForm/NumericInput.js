
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NumericInput from '../../../../src/components/SearchForm/NumericInput';

describe('NumericInput Component', () => {

  describe('render function', () => {

    it('should show label and input', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<NumericInput {...PROPS} />);
      expect(wrapper.find('label').text()).to.eql(PROPS.displayName);
      expect(wrapper.find('input').prop('type')).to.eql('number');
      expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
    });

    it('should have the numeric-input class', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<NumericInput {...PROPS} />);
      expect(wrapper.hasClass('numeric-input')).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should trigger onChange handler', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      const TEST_NUMBER = 1;
      let wrapper = shallow(<NumericInput {...PROPS} />);
      wrapper.instance().onChangeHandler({ target: { value: TEST_NUMBER }});
      expect(PROPS.onChange.called).to.eql(true);
      expect(PROPS.onChange.getCall(0).args[0]).to.eql(PROPS.fieldName);
      expect(PROPS.onChange.getCall(0).args[1]).to.eql(TEST_NUMBER);
    });
  });
});
