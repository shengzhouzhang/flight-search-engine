
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';
import FlightSearchApp from '../server/controllers/apps/FlightSearchApp';
import FlightSearchApi from '../server/controllers/apis/FlightSearchApi';
import config from '../config/server';
import routes from '../config/routes';

var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);

let server = express();

server.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

server.use(require("webpack-hot-middleware")(compiler));

server.use(compression());
server.use(bodyParser.json());
server.use(morgan('short'));

server.engine('handlebars', expressHandlebars());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, 'templates'));

server.use('/assets/', express.static(path.join(__dirname, '..', '..', 'dist', 'assets')));

server.use(routes.API_PREFIX, new FlightSearchApi().defaultRouter);
server.use(routes.APP_PREFIX, new FlightSearchApp().defaultRouter);

server.listen(config.PORT, function (err) {
  if (err) { return console.error(err); }
  console.info('Server on %s', config.PORT);
});
