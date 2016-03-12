
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import DateInput from '../../../../src/components/SearchForm/DateInput';

describe('DateInput Component', () => {

  it('should show label and input', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<DateInput {...TEST_PROPS} />);
    expect(wrapper.find('label').text()).to.eql(TEST_PROPS.displayName);
    expect(wrapper.find('input').prop('type')).to.eql('date');
    expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
  });

  it('should have the date-input class', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<DateInput {...TEST_PROPS} />);
    expect(wrapper.hasClass('date-input')).to.eql(true);
  });

  it('should trigger onChange handler', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    const TEST_DATE = '2016-03-12';
    let wrapper = shallow(<DateInput {...TEST_PROPS} />);
    wrapper.instance().onChangeHandler({ target: { value: TEST_DATE }});
    expect(TEST_PROPS.onChange.called).to.eql(true);
    expect(TEST_PROPS.onChange.getCall(0).args[0]).to.eql({ 'field-name': TEST_DATE });
  });
});
