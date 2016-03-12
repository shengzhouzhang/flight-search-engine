
const ENV = {
  PORT: parseInt(process.env.PORT)
};

console.info('PORT', ENV.PORT);

if (!ENV.PORT) { throw new Error('missing PORT.'); }

export default ENV;
