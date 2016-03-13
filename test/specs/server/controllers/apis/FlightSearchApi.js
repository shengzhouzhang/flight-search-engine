
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import routes from '../../../../../src/config/routes';
import ticketTypes from '../../../../../src/config/ticketTypes';
import FlightSearchApi from '../../../../../src/server/controllers/apis/FlightSearchApi';
import { genSearchQuery } from '../../../../utils/gen';

describe('FlightSearchApi Controller', () => {

  let server = express();
  server.use(bodyParser.json());
  server.use('/', new FlightSearchApi().defaultRouter);

  it('should handle search request for one way ticket', () => {
    let searchQuery = genSearchQuery(ticketTypes.ONEWAY);
    return new Promise((resolve, reject) => {
      supertest(server)
        .post(routes.SEARCH_TICKETS)
        .send(searchQuery)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) { return reject(new Error(err.message)); };
          return resolve(res.body);
        });
    });
  });

  it('should handle search request for return ticket', () => {
    let searchQuery = genSearchQuery(ticketTypes.RETURN);
    return new Promise((resolve, reject) => {
      supertest(server)
        .post(routes.SEARCH_TICKETS)
        .send(searchQuery)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) { return reject(new Error(err.message)); };
          return resolve(res.body);
        });
    });
  });
});
