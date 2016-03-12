
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NumericInput from '../../../../src/components/SearchForm/NumericInput';

describe('NumericInput Component', () => {

  it('should show label and input', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<NumericInput {...TEST_PROPS} />);
    expect(wrapper.find('label').text()).to.eql(TEST_PROPS.displayName);
    expect(wrapper.find('input').prop('type')).to.eql('number');
    expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
  });

  it('should have the numeric-input class', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<NumericInput {...TEST_PROPS} />);
    expect(wrapper.hasClass('numeric-input')).to.eql(true);
  });

  it('should trigger onChange handler', () => {
    const TEST_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    const TEST_NUMBER = 1;
    let wrapper = shallow(<NumericInput {...TEST_PROPS} />);
    wrapper.instance().onChangeHandler({ target: { value: TEST_NUMBER }});
    expect(TEST_PROPS.onChange.called).to.eql(true);
    expect(TEST_PROPS.onChange.getCall(0).args[0]).to.eql({ 'field-name': TEST_NUMBER });
  });
});
