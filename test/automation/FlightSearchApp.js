
require('babel-polyfill');
require('mocha-generators').install();

import path from 'path';
import Nightmare from 'nightmare';
import { expect } from 'chai';

const REQUEST_TIMEOUT = 20 * 1000;
const TEST_URL = 'http://localhost:8080/tickets/search'
const FROM = 'PNQ';
const DESTINATION = 'DEL';
const DEPARTURE_DATE = '15/03/2016';
const RETURN_DATE = '25/03/2016';
const PASSENGERS = 3;

describe('FlightSearchApp Automation', function () {

  let nightmare = Nightmare({ show: false, width: 1024, height: 700, center: true });

  before(function * () {
    this.timeout(REQUEST_TIMEOUT);
    yield nightmare.goto(TEST_URL);
  });

  it('should search for return tickets and get result', function * () {
    this.timeout(REQUEST_TIMEOUT);

    yield nightmare.wait('.search-form')
      .type('.form-item.from > input', FROM)
      .type('.form-item.destination > input', DESTINATION)
      .type('.form-item.departureDate > input', DEPARTURE_DATE)
      .type('.form-item.returnDate > input', RETURN_DATE)
      .type('.form-item.passengers > input', PASSENGERS)
      .click('button.submit-button')
      .wait(1000)
      .screenshot(path.resolve(__dirname, '../return-tickets.png'));
  });

  it('should search one way tickets and get result', function * () {
    this.timeout(REQUEST_TIMEOUT);

    yield nightmare.wait('.search-form')
      .click('a.tab-button')
      .wait('.search-form')
      .type('.form-item.from > input', FROM)
      .type('.form-item.destination > input', DESTINATION)
      .type('.form-item.departureDate > input', DEPARTURE_DATE)
      .type('.form-item.passengers > input', PASSENGERS)
      .click('button.submit-button')
      .wait(1000)
      .screenshot(path.resolve(__dirname, '../one-way-tickets.png'));
  });

  after(() => {
    return nightmare.end();
  });
});
