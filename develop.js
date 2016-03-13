
process.env.NODE_ENV = 'dev';

require('dotenv').load();

var server = require('./dist/server').default;
var config = require('./dist/config/server').default;

server.listen(config.PORT, function (err) {
  if (err) { return console.error(err); }
  console.info('Server on %s', config.PORT);
});
