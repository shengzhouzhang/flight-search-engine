
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

import { randomFlight } from '../../../utils/gen';

describe('FlightDetails Component', () => {

  describe('render function', () => {

    it('should show the flight number, from, destination, departure time, and arrival time', () => {
      const PROPS = randomFlight('0');
      let wrapper = shallow(<FlightDetails {...PROPS} />);
      expect(wrapper.find(FlightNumber)).to.have.length(1);
      expect(wrapper.find(From)).to.have.length(1);
      expect(wrapper.find(Destination)).to.have.length(1);
      expect(wrapper.find(Departure)).to.have.length(1);
      expect(wrapper.find(Arrival)).to.have.length(1);
      expect(wrapper.find(FlightNumber).prop('value')).to.eql(PROPS.number);
      expect(wrapper.find(From).prop('value')).to.eql(PROPS.from);
      expect(wrapper.find(Destination).prop('value')).to.eql(PROPS.destination);
      expect(wrapper.find(Departure).prop('value')).to.eql(`depart: ${moment(PROPS.departureTime).format('HH:mm A')}`);
      expect(wrapper.find(Arrival).prop('value')).to.eql(`arrive: ${moment(PROPS.arrivalTime).format('HH:mm A')}`);
    });

    it('should have the flight-details class', () => {
      const PROPS = randomFlight('0');
      let wrapper = shallow(<FlightDetails {...PROPS} />);
      expect(wrapper.hasClass('flight-details')).to.eql(true);
    });
  });


  describe('FlightNumber Component', () => {

    describe('render function', () => {

      it('should show the flight number', () => {
        const PROPS = { value: randomFlight('0').number };
        let wrapper = shallow(<FlightNumber {...PROPS} />);
        expect(wrapper.text()).to.eql(PROPS.value);
      });

      it('should have the flight-number class', () => {
        const PROPS = { value: randomFlight('0').number };;
        let wrapper = shallow(<FlightNumber {...PROPS} />);
        expect(wrapper.hasClass('flight-number')).to.eql(true);
      });
    });
  });

  describe('From Component', () => {

    describe('render function', () => {

      it('should show flight from', () => {
        const PROPS = { value: randomFlight('0').from };
        let wrapper = shallow(<From {...PROPS} />);
        expect(wrapper.text()).to.eql(PROPS.value);
      });

      it('should have the flight-from class', () => {
        const PROPS = { value: randomFlight('0').from };
        let wrapper = shallow(<From {...PROPS} />);
        expect(wrapper.hasClass('flight-from')).to.eql(true);
      });
    });
  });

  describe('Destination Component', () => {

    describe('render function', () => {

      it('should show flight destination', () => {
        const PROPS = { value: randomFlight('0').destination };
        let wrapper = shallow(<Destination {...PROPS} />);
        expect(wrapper.text()).to.eql(PROPS.destination);
      });

      it('should have the flight-destination class', () => {
        const PROPS = { value: randomFlight('0').destination };
        let wrapper = shallow(<Destination {...PROPS} />);
        expect(wrapper.hasClass('flight-destination')).to.eql(true);
      });
    });
  });

  describe('Departure Component', () => {

    describe('render function', () => {

      it('should show formated flight departure time', () => {
        const PROPS = { value: randomFlight('0').departureTime };
        let wrapper = shallow(<Departure {...PROPS} />);
        expect(wrapper.text()).to.eql(moment(PROPS.departureTime).format('HH:mm A'));
      });

      it('should have the flight-departure class', () => {
        const PROPS = { value: randomFlight('0').departureTime };
        let wrapper = shallow(<Departure {...PROPS} />);
        expect(wrapper.hasClass('flight-departure')).to.eql(true);
      });
    });
  });

  describe('Arrival Component', () => {

    describe('render function', () => {

      it('should show formated flight arrival time', () => {
        const PROPS = { value: randomFlight('0').arrivalTime };
        let wrapper = shallow(<Arrival {...PROPS} />);
        expect(wrapper.text()).to.eql(moment(PROPS.departureTime).format('HH:mm A'));
      });

      it('should have the flight-arrival class', () => {
        const PROPS = { value: randomFlight('0').arrivalTime };
        let wrapper = shallow(<Arrival {...PROPS} />);
        expect(wrapper.hasClass('flight-arrival')).to.eql(true);
      });
    });
  });
});
