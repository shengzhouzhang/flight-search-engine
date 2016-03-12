
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TextInput from '../../../../src/components/SearchForm/TextInput';
import DateInput from '../../../../src/components/SearchForm/DateInput';
import NumericInput from '../../../../src/components/SearchForm/NumericInput';
import SubmitButton from '../../../../src/components/SearchForm/SubmitButton';
import SearchForm from '../../../../src/components/SearchForm/SearchForm';
import ticketTypes from '../../../../src/config/ticketTypes';

describe('SearchForm Component', () => {

  it('should show from, destination, departure date, passengers, and submit button', () => {
    const TEST_PROPS = {
      type: ticketTypes.ONEWAY
    };
    let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
    expect(wrapper.contains(
      <TextInput fieldName="from" displayName="from" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <TextInput fieldName="destination" displayName="destination" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <DateInput fieldName="departureDate" displayName="departure date" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <DateInput fieldName="returnDate" displayName="return date" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(false);
    expect(wrapper.contains(
      <NumericInput fieldName="passengers" displayName="passengers" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <SubmitButton onSubmit={wrapper.instance().onSubmitHandler} />
    )).to.eql(true);
  });

  it('should show from, destination, departure date, return date, passengers, and submit button', () => {
    const TEST_PROPS = {
      type: ticketTypes.RETURN
    };
    let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
    expect(wrapper.contains(
      <TextInput fieldName="from" displayName="from" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <TextInput fieldName="destination" displayName="destination" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <DateInput fieldName="departureDate" displayName="departure date" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <DateInput fieldName="returnDate" displayName="return date" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <NumericInput fieldName="passengers" displayName="passengers" onChange={wrapper.instance().onChangeHandler} />
    )).to.eql(true);
    expect(wrapper.contains(
      <SubmitButton onSubmit={wrapper.instance().onSubmitHandler} />
    )).to.eql(true);
  });

  it('should have the search-form class', () => {
    const TEST_PROPS = {
      type: ticketTypes.ONEWAY
    };
    let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
    expect(wrapper.hasClass('search-form')).to.eql(true);
  });

  it('should update state - oneway', () => {
    const TEST_PROPS = {
      type: ticketTypes.ONEWAY
    };
    let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
    expect(wrapper.instance().state.from).to.eql(null);
    expect(wrapper.instance().state.destination).to.eql(null);
    expect(wrapper.instance().state.departureDate).to.eql(null);
    expect(wrapper.instance().state.passengers).to.eql(null);
    wrapper.instance().onChangeHandler({ from: 'PNQ' });
    wrapper.instance().onChangeHandler({ destination: 'DEL' });
    wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
    wrapper.instance().onChangeHandler({ passengers: 2 });
    expect(wrapper.instance().state).to.eql({
      from: 'PNQ',
      destination: 'DEL',
      departureDate: '2016-03-12',
      passengers: 2
    });
  });

  it('should update state - return', () => {
    const TEST_PROPS = {
      type: ticketTypes.RETURN
    };
    let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
    expect(wrapper.instance().state.from).to.eql(null);
    expect(wrapper.instance().state.destination).to.eql(null);
    expect(wrapper.instance().state.departureDate).to.eql(null);
    expect(wrapper.instance().state.returnDate).to.eql(null);
    expect(wrapper.instance().state.passengers).to.eql(null);
    wrapper.instance().onChangeHandler({ from: 'PNQ' });
    wrapper.instance().onChangeHandler({ destination: 'DEL' });
    wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
    wrapper.instance().onChangeHandler({ returnDate: '2016-03-22' });
    wrapper.instance().onChangeHandler({ passengers: 2 });
    expect(wrapper.instance().state).to.eql({
      from: 'PNQ',
      destination: 'DEL',
      departureDate: '2016-03-12',
      returnDate: '2016-03-22',
      passengers: 2
    });
  });

  describe('onSubmitHandler funciton', () => {

    it('should call buildQueryOneWay function', () => {
      const TEST_PROPS = {
        type: ticketTypes.ONEWAY
      };
      let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
      wrapper.instance().buildQueryOneWay = sinon.stub().returns(Promise.resolve());
      wrapper.instance().onSubmitHandler();
      expect(wrapper.instance().buildQueryOneWay.called).to.eql(true);
    });

    it('should call buildQueryReturn function', () => {
      const TEST_PROPS = {
        type: ticketTypes.RETURN
      };
      let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
      wrapper.instance().buildQueryReturn = sinon.stub().returns(Promise.resolve());
      wrapper.instance().onSubmitHandler();
      expect(wrapper.instance().buildQueryReturn.called).to.eql(true);
    });
  });

  describe('buildQueryOneWay funciton', () => {

    it('should return query for search flights', () => {
      const TEST_PROPS = {
        type: ticketTypes.ONEWAY
      };
      let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
      wrapper.instance().onChangeHandler({ from: 'PNQ' });
      wrapper.instance().onChangeHandler({ destination: 'DEL' });
      wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
      wrapper.instance().onChangeHandler({ passengers: 2 });
      return wrapper.instance().buildQueryOneWay()
        .then(query => {
          expect(query).to.eql({
            type: ticketTypes.ONEWAY,
            from: 'PNQ',
            destination: 'DEL',
            departureDate: '2016-03-12',
            passengers: 2
          });
        });
    });
  });

  describe('buildQueryReturn funciton', () => {

    it('should return query for search flights', () => {
      const TEST_PROPS = {
        type: ticketTypes.RETURN
      };
      let wrapper = shallow(<SearchForm {...TEST_PROPS} />);
      wrapper.instance().onChangeHandler({ from: 'PNQ' });
      wrapper.instance().onChangeHandler({ destination: 'DEL' });
      wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
      wrapper.instance().onChangeHandler({ returnDate: '2016-03-22' });
      wrapper.instance().onChangeHandler({ passengers: 2 });
      return wrapper.instance().buildQueryReturn()
        .then(query => {
          expect(query).to.eql({
            type: ticketTypes.RETURN,
            from: 'PNQ',
            destination: 'DEL',
            departureDate: '2016-03-12',
            returnDate: '2016-03-22',
            passengers: 2
          });
        });
    });
  });
});
