
import moment from 'moment';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TextInput from '../../../../src/components/SearchForm/TextInput';
import DateInput from '../../../../src/components/SearchForm/DateInput';
import NumericInput from '../../../../src/components/SearchForm/NumericInput';
import SubmitButton from '../../../../src/components/SearchForm/SubmitButton';
import { SearchFormOneWay, SearchFormReturn } from '../../../../src/components/SearchForm/SearchForm';
import ticketTypes from '../../../../src/config/ticketTypes';
import currencyTypes from '../../../../src/config/currencyTypes';
import Currency from '../../../../src/domains/Currency';

describe('SearchFormOneWay Component', () => {

  describe('render function', () => {

    it('should show from, destination, departure date, passengers, and submit button', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormOneWay {...PROPS} />);
      expect(wrapper.contains(
        <TextInput fieldName="from" displayName="from" value={wrapper.instance().state.fields.from}
          hasError={wrapper.instance().state.errors.from} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <TextInput fieldName="destination" displayName="destination" value={wrapper.instance().state.fields.destination}
          hasError={wrapper.instance().state.errors.destination} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <DateInput fieldName="departureDate" displayName="departure date" value={wrapper.instance().state.fields.departureDate}
          hasError={wrapper.instance().state.errors.departureDate} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <NumericInput fieldName="passengers" displayName="passengers" value={wrapper.instance().state.fields.passengers}
          hasError={wrapper.instance().state.errors.passengers} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <SubmitButton onSubmit={wrapper.instance().onSubmitHandler} />
      )).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should update state', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormOneWay {...PROPS} />);
      expect(wrapper.instance().state.fields.from).to.eql('');
      expect(wrapper.instance().state.fields.destination).to.eql('');
      expect(wrapper.instance().state.fields.departureDate).to.eql(moment().format('YYYY-MM-DD'));
      expect(wrapper.instance().state.fields.passengers).to.eql(1);
      wrapper.instance().onChangeHandler('from', 'PNQ');
      wrapper.instance().onChangeHandler('destination', 'DEL');
      wrapper.instance().onChangeHandler('departureDate', '2016-03-12');
      wrapper.instance().onChangeHandler('passengers', 2);
      expect(wrapper.instance().state.fields).to.eql({
        from: 'PNQ',
        destination: 'DEL',
        departureDate: '2016-03-12',
        passengers: 2
      });
    });
  });


  describe('onSubmitHandler funciton', () => {

    it('should call isValid function and onSearch hander', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormOneWay {...PROPS} />);
      wrapper.instance().isValid = sinon.stub().returns(true);
      wrapper.instance().onSubmitHandler();
      expect(wrapper.instance().isValid.called).to.eql(true);
      expect(PROPS.onSearch.called).to.eql(true);
      expect(PROPS.onSearch.getCall(0).args[0]).to.eql({
        ticketType: ticketTypes.ONEWAY,
        currency: Currency.fromJson(currencyTypes.GBP),
        from: '',
        destination: '',
        departureDate: moment().format('YYYY-MM-DD'),
        passengers: 1
      });
    });
  });

  // describe('buildQuery funciton', () => {
  //
  //   it('should return query for search flights', () => {
  //     const PROPS = {
  //       onSearch: sinon.spy()
  //     };
  //     let wrapper = shallow(<SearchFormOneWay {...PROPS} />);
  //     wrapper.instance().onChangeHandler({ from: 'PNQ' });
  //     wrapper.instance().onChangeHandler({ destination: 'DEL' });
  //     wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
  //     wrapper.instance().onChangeHandler({ passengers: 2 });
  //     let searchQuery = wrapper.instance().buildQuery();
  //     expect(searchQuery).to.eql({
  //       ticketType: ticketTypes.ONEWAY,
  //       currency: Currency.fromJson(currencyTypes.GBP),
  //       from: 'PNQ',
  //       destination: 'DEL',
  //       departureDate: '2016-03-12',
  //       passengers: 2
  //     });
  //   });
  // });
});

describe('SearchFormReturn Component', () => {

  describe('render function', () => {

    it('should show from, destination, departure date, return date, passengers, and submit button', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormReturn {...PROPS} />);
      expect(wrapper.contains(
        <TextInput fieldName="from" displayName="from" value={wrapper.instance().state.fields.from}
          hasError={wrapper.instance().state.errors.from} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <TextInput fieldName="destination" displayName="destination" value={wrapper.instance().state.fields.destination}
          hasError={wrapper.instance().state.errors.destination} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <DateInput fieldName="departureDate" displayName="departure date" value={wrapper.instance().state.fields.departureDate}
          hasError={wrapper.instance().state.errors.departureDate} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <DateInput fieldName="returnDate" displayName="return date" value={wrapper.instance().state.fields.returnDate}
          hasError={wrapper.instance().state.errors.returnDate} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <NumericInput fieldName="passengers" displayName="passengers" value={wrapper.instance().state.fields.passengers}
          hasError={wrapper.instance().state.errors.passengers} onChange={wrapper.instance().onChangeHandler} />
      )).to.eql(true);
      expect(wrapper.contains(
        <SubmitButton onSubmit={wrapper.instance().onSubmitHandler} />
      )).to.eql(true);
    });
  });

  describe('onChangeHandler function', () => {

    it('should update state', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormReturn {...PROPS} />);
      expect(wrapper.instance().state.fields.from).to.eql('');
      expect(wrapper.instance().state.fields.destination).to.eql('');
      expect(wrapper.instance().state.fields.departureDate).to.eql(moment().format('YYYY-MM-DD'));
      expect(wrapper.instance().state.fields.returnDate).to.eql(moment().add(1, 'day').format('YYYY-MM-DD'));
      expect(wrapper.instance().state.fields.passengers).to.eql(1);
      wrapper.instance().onChangeHandler('from', 'PNQ');
      wrapper.instance().onChangeHandler('destination', 'DEL');
      wrapper.instance().onChangeHandler('departureDate', '2016-03-12');
      wrapper.instance().onChangeHandler('returnDate', '2016-03-22');
      wrapper.instance().onChangeHandler('passengers', 2);
      expect(wrapper.instance().state.fields).to.eql({
        from: 'PNQ',
        destination: 'DEL',
        departureDate: '2016-03-12',
        returnDate: '2016-03-22',
        passengers: 2
      });
    });
  });

  describe('onSubmitHandler funciton', () => {

    it('should call isValid function and onSearch handler', () => {
      const PROPS = {
        onSearch: sinon.spy()
      };
      let wrapper = shallow(<SearchFormReturn {...PROPS} />);
      wrapper.instance().isValid = sinon.stub().returns(true);
      wrapper.instance().onSubmitHandler();
      expect(wrapper.instance().isValid.called).to.eql(true);
      expect(PROPS.onSearch.called).to.eql(true);
      expect(PROPS.onSearch.getCall(0).args[0]).to.eql({
        ticketType: ticketTypes.RETURN,
        currency: Currency.fromJson(currencyTypes.GBP),
        from: '',
        destination: '',
        departureDate: moment().format('YYYY-MM-DD'),
        returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        passengers: 1
      });
    });
  });

  // describe('buildQuery funciton', () => {
  //
  //   it('should return query for search flights', () => {
  //     const PROPS = {
  //       onSearch: sinon.spy()
  //     };
  //     let wrapper = shallow(<SearchFormReturn {...PROPS} />);
  //     wrapper.instance().onChangeHandler({ from: 'PNQ' });
  //     wrapper.instance().onChangeHandler({ destination: 'DEL' });
  //     wrapper.instance().onChangeHandler({ departureDate: '2016-03-12' });
  //     wrapper.instance().onChangeHandler({ returnDate: '2016-03-22' });
  //     wrapper.instance().onChangeHandler({ passengers: 2 });
  //     let searchQuery = wrapper.instance().buildQuery();
  //     expect(searchQuery).to.eql({
  //       ticketType: ticketTypes.RETURN,
  //       currency: Currency.fromJson(currencyTypes.GBP),
  //       from: 'PNQ',
  //       destination: 'DEL',
  //       departureDate: '2016-03-12',
  //       returnDate: '2016-03-22',
  //       passengers: 2
  //     });
  //   });
  // });
});
