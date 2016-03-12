
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TabButton from '../../../../src/components/SearchForm/TabButton';
import SearchForm from '../../../../src/components/SearchForm/SearchForm';
import Container from '../../../../src/components/SearchForm/Container';
import ticketTypes from '../../../../src/config/ticketTypes';

describe('Container Component', () => {

  describe('initial state', () => {
    let wrapper = shallow(<Container />);
    expect(wrapper.state('type')).to.eql(ticketTypes.RETURN);
  });

  describe('render function', () => {

    it('should show unselected one way tab, selected return tab, and return search form', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.contains(
        <TabButton name="one way" selected={false} onSelect={wrapper.instance().selectOneWay} />
      )).to.eql(true);
      expect(wrapper.contains(
        <TabButton name="return" selected={true} onSelect={wrapper.instance().selectReturn} />
      )).to.eql(true);
      expect(wrapper.contains(<SearchForm type={ticketTypes.RETURN} />)).to.eql(true);
    });

    it('should show selected one way tab, unselected return tab, and one way search form', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.ONEWAY });
      expect(wrapper.contains(
        <TabButton name="one way" selected={true} onSelect={wrapper.instance().selectOneWay} />
      )).to.eql(true);
      expect(wrapper.contains(
        <TabButton name="return" selected={false} onSelect={wrapper.instance().selectReturn} />
      )).to.eql(true);
      expect(wrapper.contains(<SearchForm type={ticketTypes.ONEWAY} />)).to.eql(true);
    });

    it('should have the form-container, form-header, and form-body classes', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.hasClass('form-container')).to.eql(true);
      expect(wrapper.childAt(0).hasClass('form-header')).to.eql(true);
      expect(wrapper.childAt(1).hasClass('form-body')).to.eql(true);
    });
  });

  describe('isOneWaySelected function', () => {

    it('should return true if type is one way', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.ONEWAY });
      expect(wrapper.instance().isOneWaySelected()).to.eql(true);
    });

    it('should return false if type is return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.RETURN });
      expect(wrapper.instance().isOneWaySelected()).to.eql(false);
    });
  });

  describe('isReturnSelected function', () => {

    it('should return false if type is one way', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.ONEWAY });
      expect(wrapper.instance().isReturnSelected()).to.eql(false);
    });

    it('should return true if type is return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.RETURN });
      expect(wrapper.instance().isReturnSelected()).to.eql(true);
    });
  });

  describe('selectOneWay function', () => {

    it('should update type to one way', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.state('type')).to.eql(ticketTypes.RETURN);
      wrapper.instance().selectOneWay();
      expect(wrapper.state('type')).to.eql(ticketTypes.ONEWAY);
      wrapper.instance().selectOneWay();
      expect(wrapper.state('type')).to.eql(ticketTypes.ONEWAY);
    });
  });

  describe('selectReturn function', () => {

    it('should update type to return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ type: ticketTypes.ONEWAY });
      expect(wrapper.state('type')).to.eql(ticketTypes.ONEWAY);
      wrapper.instance().selectReturn();
      expect(wrapper.state('type')).to.eql(ticketTypes.RETURN);
      wrapper.instance().selectReturn();
      expect(wrapper.state('type')).to.eql(ticketTypes.RETURN);
    });
  });
});
