
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import DateInput from '../../../../src/components/SearchForm/DateInput';

describe('DateInput Component', () => {

  describe('render function', () => {

    it('should show label and input', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<DateInput {...PROPS} />);
      expect(wrapper.find('label').text()).to.eql(PROPS.displayName);
      expect(wrapper.find('input').prop('type')).to.eql('date');
      expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
    });

    it('should have the date-input class', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      let wrapper = shallow(<DateInput {...PROPS} />);
      expect(wrapper.hasClass('date-input')).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should trigger onChange handler', () => {
      const PROPS = {
        fieldName: 'field-name',
        displayName: 'display-name',
        onChange: sinon.spy()
      };
      const TEST_DATE = '2016-03-12';
      let wrapper = shallow(<DateInput {...PROPS} />);
      wrapper.instance().onChangeHandler({ target: { value: TEST_DATE }});
      expect(PROPS.onChange.called).to.eql(true);
      expect(PROPS.onChange.getCall(0).args[0]).to.eql(PROPS.fieldName);
      expect(PROPS.onChange.getCall(0).args[1]).to.eql(TEST_DATE);
    });
  });
});
