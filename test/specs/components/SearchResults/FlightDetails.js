
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FlightDetails, {
  FlightNumber,
  From,
  Destination,
  Depart,
  Arrive
} from '../../../../src/components/SearchResults/FlightDetails';

describe('Search Results Flight Details Component', () => {

  const FLIGHT_NUMBER = 'AI-202';
  const FROM = 'PNQ';
  const DESTINATION = 'DEL';
  const DEPART = '2014-01-01 10:00 AM';
  const ARRIVE = '2014-01-01 12:00 PM';

  it('should show the flight number, from, destination, departure time, and arrival time', () => {
    const TEST_FLIGHT_DETAILS = {
      number: FLIGHT_NUMBER,
      from: FROM,
      destination: DESTINATION,
      depart: moment(DEPART, 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment(ARRIVE, 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    let wrapper = shallow(<FlightDetails {...TEST_FLIGHT_DETAILS} />);
    expect(wrapper.find(FlightNumber)).to.have.length(1);
    expect(wrapper.find(From)).to.have.length(1);
    expect(wrapper.find(Destination)).to.have.length(1);
    expect(wrapper.find(Depart)).to.have.length(1);
    expect(wrapper.find(Arrive)).to.have.length(1);
    expect(wrapper.find(FlightNumber).prop('value')).to.eql(TEST_FLIGHT_DETAILS.number);
    expect(wrapper.find(From).prop('value')).to.eql(TEST_FLIGHT_DETAILS.from);
    expect(wrapper.find(Destination).prop('value')).to.eql(TEST_FLIGHT_DETAILS.destination);
    expect(wrapper.find(Depart).prop('value')).to.eql(TEST_FLIGHT_DETAILS.depart);
    expect(wrapper.find(Arrive).prop('value')).to.eql(TEST_FLIGHT_DETAILS.arrive);
  });

  it('should have the flight-details class name', () => {
    const TEST_FLIGHT_DETAILS = {
      number: FLIGHT_NUMBER,
      from: FROM,
      destination: DESTINATION,
      depart: moment(DEPART, 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment(ARRIVE, 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    let wrapper = shallow(<FlightDetails {...TEST_FLIGHT_DETAILS} />);
    expect(wrapper.prop('className')).to.eql('flight-details');
  });

  describe('Flight Number Component', () => {

    it('should show the flight number', () => {
      const TEST_FLIGHT_NUMBER = FLIGHT_NUMBER;
      let wrapper = shallow(<FlightNumber value={TEST_FLIGHT_NUMBER} />);
      expect(wrapper.text()).to.eql(TEST_FLIGHT_NUMBER);
    });

    it('should have the flight-number class name', () => {
      const TEST_FLIGHT_NUMBER = FLIGHT_NUMBER;
      let wrapper = shallow(<FlightNumber value={TEST_FLIGHT_NUMBER} />);
      expect(wrapper.prop('className')).to.eql('flight-number');
    });
  });

  describe('From Component', () => {

    it('should show flight from', () => {
      const TEST_FROM = FROM;
      let wrapper = shallow(<From value={TEST_FROM} />);
      expect(wrapper.text()).to.eql(TEST_FROM);
    });

    it('should have the flight-from class name', () => {
      const TEST_FROM = FROM;
      let wrapper = shallow(<From value={TEST_FROM} />);
      expect(wrapper.prop('className')).to.eql('flight-from');
    });
  });

  describe('Destination Component', () => {

    it('should show flight destination', () => {
      const TEST_DESTINATION = DESTINATION;
      let wrapper = shallow(<Destination value={TEST_DESTINATION} />);
      expect(wrapper.text()).to.eql(TEST_DESTINATION);
    });

    it('should have the flight-destination class name', () => {
      const TEST_DESTINATION = DESTINATION;
      let wrapper = shallow(<Destination value={TEST_DESTINATION} />);
      expect(wrapper.prop('className')).to.eql('flight-destination');
    });
  });

  describe('Depart Component', () => {

    it('should show formated flight departure time', () => {
      const TEST_DEPART = moment(DEPART, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Depart value={TEST_DEPART} />);
      expect(wrapper.text()).to.eql(DEPART.substring(11));
    });

    it('should have the flight-departure class name', () => {
      const TEST_DEPART = moment(DEPART, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Depart value={TEST_DEPART} />);
      expect(wrapper.prop('className')).to.eql('flight-departure');
    });
  });

  describe('Arrive Component', () => {

    it('should have the flight-arrival class name', () => {
      const TEST_ARRIVE = moment(ARRIVE, 'YYYY-MM-DD HH:mm A').valueOf()
      let wrapper = shallow(<Arrive value={TEST_ARRIVE} />);
      expect(wrapper.prop('className')).to.eql('flight-arrival');
    });
  });
});
