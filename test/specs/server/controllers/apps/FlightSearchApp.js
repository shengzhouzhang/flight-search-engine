
import path from 'path';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import supertest from 'supertest';
import routes from '../../../../../src/config/routes';
import FlightSearchApp from '../../../../../src/server/controllers/apps/FlightSearchApp';

describe('FlightSearchApi Controller', () => {

  let server = express();
  server.engine('handlebars', expressHandlebars());
  server.set('view engine', 'handlebars');
  server.set('views', path.join(__dirname, '..', '..', '..', '..', '..', '/src/server/templates'));
  server.use('/', new FlightSearchApp().defaultRouter);

  it('should handle page request', () => {
    return new Promise((resolve, reject) => {
      supertest(server)
        .get(routes.SEARCH_TICKETS)
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end((err, res) => {
          if (err) { return reject(new Error(err.message)); };
          return resolve(res.text);
        });
    });
  });
});
