
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TabButton from '../../../../src/components/SearchForm/TabButton';
import { SearchFormOneWay, SearchFormReturn } from '../../../../src/components/SearchForm/SearchForm';
import Container from '../../../../src/components/SearchForm/Container';
import ticketTypes from '../../../../src/config/ticketTypes';

describe('Search Form Container Component', () => {

  describe('initial state', () => {

    it('should have ticketTypes.RETURN', () => {
      
      let wrapper = shallow(<Container />);
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.RETURN);
    });
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
      expect(wrapper.find(SearchFormReturn)).to.have.length(1);
    });

    it('should show selected one way tab, unselected return tab, and one way search form', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.ONEWAY });
      expect(wrapper.contains(
        <TabButton name="one way" selected={true} onSelect={wrapper.instance().selectOneWay} />
      )).to.eql(true);
      expect(wrapper.contains(
        <TabButton name="return" selected={false} onSelect={wrapper.instance().selectReturn} />
      )).to.eql(true);
      expect(wrapper.find(SearchFormOneWay)).to.have.length(1);
    });

    it('should have the form-container, form-header, and form-body classes', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.hasClass('form-container')).to.eql(true);
      expect(wrapper.childAt(0).hasClass('form-header')).to.eql(true);
      expect(wrapper.childAt(1).hasClass('form-body')).to.eql(true);
    });
  });

  describe('isOneWaySelected function', () => {

    it('should return true if ticketType is one way', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.ONEWAY });
      expect(wrapper.instance().isOneWaySelected()).to.eql(true);
    });

    it('should return false if ticketType is return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.RETURN });
      expect(wrapper.instance().isOneWaySelected()).to.eql(false);
    });
  });

  describe('isReturnSelected function', () => {

    it('should return false if ticketType is one way', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.ONEWAY });
      expect(wrapper.instance().isReturnSelected()).to.eql(false);
    });

    it('should return true if ticketType is return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.RETURN });
      expect(wrapper.instance().isReturnSelected()).to.eql(true);
    });
  });

  describe('selectOneWay function', () => {

    it('should update ticketType to one way', () => {
      let wrapper = shallow(<Container />);
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.RETURN);
      wrapper.instance().selectOneWay();
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.ONEWAY);
      wrapper.instance().selectOneWay();
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.ONEWAY);
    });
  });

  describe('selectReturn function', () => {

    it('should update ticketType to return', () => {
      let wrapper = shallow(<Container />);
      wrapper.setState({ ticketType: ticketTypes.ONEWAY });
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.ONEWAY);
      wrapper.instance().selectReturn();
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.RETURN);
      wrapper.instance().selectReturn();
      expect(wrapper.state('ticketType')).to.eql(ticketTypes.RETURN);
    });
  });
});
