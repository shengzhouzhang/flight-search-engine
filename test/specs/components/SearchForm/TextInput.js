
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TextInput from '../../../../src/components/SearchForm/TextInput';

describe('TextInput Component', () => {

  it('should show label and input', () => {
    const TEXT_INPUT_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<TextInput {...TEXT_INPUT_PROPS} />);
    expect(wrapper.find('label').text()).to.eql(TEXT_INPUT_PROPS.displayName);
    expect(wrapper.find('input').prop('type')).to.eql('text');
    expect(wrapper.find('input').prop('onChange')).to.eql(wrapper.instance().onChangeHandler);
  });

  it('should have the text-input class', () => {
    const TEXT_INPUT_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    let wrapper = shallow(<TextInput {...TEXT_INPUT_PROPS} />);
    expect(wrapper.hasClass('text-input')).to.eql(true);
  });

  it('should trigger onChange handler', () => {
    const TEXT_INPUT_PROPS = {
      fieldName: 'field-name',
      displayName: 'display-name',
      onChange: sinon.spy()
    };
    const TEST_TEXT = 'TEST_TEXT';
    let wrapper = shallow(<TextInput {...TEXT_INPUT_PROPS} />);
    wrapper.instance().onChangeHandler({ target: { value: TEST_TEXT }});
    expect(TEXT_INPUT_PROPS.onChange.called).to.eql(true);
    expect(TEXT_INPUT_PROPS.onChange.getCall(0).args[0]).to.eql({ 'field-name': TEST_TEXT });
  });
});
