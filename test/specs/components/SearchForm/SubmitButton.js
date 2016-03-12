
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SubmitButton from '../../../../src/components/SearchForm/SubmitButton';

describe('SubmitButton Component', () => {

  it('should show the search text', () => {
    const TEST_PROPS = {
      onSubmit: sinon.spy()
    };
    let wrapper = shallow(<SubmitButton {...TEST_PROPS} />);
    expect(wrapper.text()).to.eql('search');
    expect(wrapper.prop('onClick')).to.eql(wrapper.instance().onClickHandler);
  });

  it('should have the submit-button class', () => {
    const TEST_PROPS = {
      onChange: sinon.spy()
    };
    let wrapper = shallow(<SubmitButton {...TEST_PROPS} />);
    expect(wrapper.hasClass('submit-button')).to.eql(true);
  });

  it('should trigger onSubmit handler', () => {
    const TEST_PROPS = {
      onSubmit: sinon.spy()
    };
    const TEST_EVENT = { preventDefault: sinon.spy() };
    let wrapper = shallow(<SubmitButton {...TEST_PROPS} />);
    wrapper.instance().onClickHandler(TEST_EVENT);
    expect(TEST_EVENT.preventDefault.called).to.eql(true);
    expect(TEST_PROPS.onSubmit.called).to.eql(true);
  });
});
