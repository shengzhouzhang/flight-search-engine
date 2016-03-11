
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

  describe('Flight Number Component', () => {

    it('should show the flight number', () => {
      const TEST_FLIGHT_NUMBER = FLIGHT_NUMBER;
      let wrapper = shallow(<FlightNumber value={TEST_FLIGHT_NUMBER} />);
      expect(wrapper.text()).to.eql(TEST_FLIGHT_NUMBER);
    });
  });

  describe('From Component', () => {

    it('should show flight from', () => {
      const TEST_FROM = FROM;
      let wrapper = shallow(<From value={TEST_FROM} />);
      expect(wrapper.text()).to.eql(TEST_FROM);
    });
  });

  describe('Destination Component', () => {

    it('should show flight number destination', () => {
      const TEST_DESTINATION = DESTINATION;
      let wrapper = shallow(<Destination value={TEST_DESTINATION} />);
      expect(wrapper.text()).to.eql(TEST_DESTINATION);
    });
  });

  describe('Depart Component', () => {

    it('should show flight departure time', () => {
      const TEST_DEPART = moment(DEPART, 'YYYY-MM-DD HH:mm A').valueOf();
      let wrapper = shallow(<Depart value={TEST_DEPART} />);
      expect(wrapper.text()).to.eql(DEPART.split(' ')[1]);
    });
  });

  describe('Arrive Component', () => {

    it('should show flight arrival time', () => {
      const TEST_ARRIVE = moment(ARRIVE, 'YYYY-MM-DD HH:mm A').valueOf()
      let wrapper = shallow(<Arrive value={TEST_ARRIVE} />);
      expect(wrapper.text()).to.eql(ARRIVE.split(' ')[1]);
    });
  });
});
