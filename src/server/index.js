
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';
import FlightSearchApp from '../server/controllers/apps/FlightSearchApp';
import FlightSearchApi from '../server/controllers/apis/FlightSearchApi';
import routes from '../config/routes';

let server = express();

server.use(compression());
server.use(bodyParser.json());
server.use(morgan('short'));

server.engine('handlebars', expressHandlebars());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, 'templates'));

server.use('/assets/', express.static(path.join(__dirname, '..', '..', 'dist', 'assets')));

server.use(routes.API_PREFIX, new FlightSearchApi().defaultRouter);
server.use(routes.APP_PREFIX, new FlightSearchApp().defaultRouter);

export default server;
