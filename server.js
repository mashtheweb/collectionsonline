const Hapi = require('hapi');
const routes = require('./routes');
const auth = require('./auth');

module.exports = (elastic, config, cb) => {
  const server = new Hapi.Server();

  server.connection({
    port: config.port,
    routes: { cors: true }
  });

  server.route(routes(elastic, config));
  console.log('server start with config auth: ', config.auth, typeof config.auth);
  if (config.auth) {
    console.log('authentication loaded');
    server.route(auth());
    server.register(require('hapi-auth-jwt2'), (err) => {
      if (err) {
        return cb(err);
      }
      server.register(require('./auth/authentication'));
    });
  } else {
    console.log('no authentication');
  }
  server.register([
    {
      register: require('good'),
      options: {
        reporters: {
          console: [{ module: 'good-console' }, 'stdout']
        }
      }
    },
    require('inert'),
    require('hapi-negotiator'),
    require('vision'),
    require('./routes/plugins/error')
  ], (err) => {
    if (err) {
      return cb(err);
    }

    server.views({
      engines: { html: { module: require('handlebars'), compileMode: 'sync' } },
      relativeTo: __dirname,
      path: './templates/pages',
      layout: 'default',
      layoutPath: './templates/layouts',
      partialsPath: './templates/partials',
      helpersPath: './templates/helpers'
    });

    cb(null, { server, elastic });
  });
};
