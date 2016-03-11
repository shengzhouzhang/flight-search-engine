
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

  it('should show the flight number, from, destination, departure time, and arrival time', () => {
    const TEST_FLIGHT_DETAILS = {
      number: 'AI-202',
      from: 'PNQ',
      destination: 'DEL',
      depart: moment().valueOf(),
      arrive: moment().add(1, 'hour').valueOf(),
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
});
