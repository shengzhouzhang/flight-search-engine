
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FlightDetails, {
  FlightNumber,
  From,
  Destination,
  Departure,
  Arrival
} from '../../../../src/components/SearchResults/FlightDetails';

describe('Search Results Flight Details Component', () => {

  const FLIGHT_NUMBER = 'AI-202';
  const FROM = 'PNQ';
  const DESTINATION = 'DEL';
  const DEPARTURE = '2014-01-01 10:00 AM';
  const ARRIVAL = '2014-01-01 12:00 PM';

  it('should show the flight number, from, destination, departure time, and arrival time', () => {
    const TEST_FLIGHT_DETAILS = {
      number: FLIGHT_NUMBER,
      from: FROM,
      destination: DESTINATION,
      depart: moment(DEPARTURE, 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment(ARRIVAL, 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    let wrapper = shallow(<FlightDetails {...TEST_FLIGHT_DETAILS} />);
    expect(wrapper.find(FlightNumber)).to.have.length(1);
    expect(wrapper.find(From)).to.have.length(1);
    expect(wrapper.find(Destination)).to.have.length(1);
    expect(wrapper.find(Departure)).to.have.length(1);
    expect(wrapper.find(Arrival)).to.have.length(1);
    expect(wrapper.find(FlightNumber).prop('value')).to.eql(TEST_FLIGHT_DETAILS.number);
    expect(wrapper.find(From).prop('value')).to.eql(TEST_FLIGHT_DETAILS.from);
    expect(wrapper.find(Destination).prop('value')).to.eql(TEST_FLIGHT_DETAILS.destination);
    expect(wrapper.find(Departure).prop('value')).to.eql(TEST_FLIGHT_DETAILS.depart);
    expect(wrapper.find(Arrival).prop('value')).to.eql(TEST_FLIGHT_DETAILS.arrive);
  });

  it('should have the flight-details class name', () => {
    const TEST_FLIGHT_DETAILS = {
      number: FLIGHT_NUMBER,
      from: FROM,
      destination: DESTINATION,
      depart: moment(DEPARTURE, 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment(ARRIVAL, 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    let wrapper = shallow(<FlightDetails {...TEST_FLIGHT_DETAILS} />);
    expect(wrapper.hasClass('flight-details')).to.eql(true);
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
      expect(wrapper.hasClass('flight-number')).to.eql(true);
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
      expect(wrapper.hasClass('flight-from')).to.eql(true);
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
      expect(wrapper.hasClass('flight-destination')).to.eql(true);
    });
  });

  describe('Departure Component', () => {

    it('should show formated flight departure time', () => {
      const TEST_DEPARTURE = moment(DEPARTURE, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Departure value={TEST_DEPARTURE} />);
      expect(wrapper.text()).to.eql(DEPARTURE.substring(11));
    });

    it('should have the flight-departure class name', () => {
      const TEST_DEPARTURE = moment(DEPARTURE, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Departure value={TEST_DEPARTURE} />);
      expect(wrapper.hasClass('flight-departure')).to.eql(true);
    });
  });

  describe('Arrival Component', () => {

    it('should show formated flight arrival time', () => {
      const TEST_ARRIVAL = moment(ARRIVAL, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Arrival value={TEST_ARRIVAL} />);
      expect(wrapper.text()).to.eql(ARRIVAL.substring(11));
    });

    it('should have the flight-arrival class name', () => {
      const TEST_ARRIVAL = moment(ARRIVAL, 'YYYY-MM-DD HH:mm A').valueOf()
      let wrapper = shallow(<Arrival value={TEST_ARRIVAL} />);
      expect(wrapper.hasClass('flight-arrival')).to.eql(true);
    });
  });
});
