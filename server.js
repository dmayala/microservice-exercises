'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

// Add the route
server.route({
  method: 'GET',
  path:'/hello', 
  handler: function (request, reply) {
    return reply('hello world');
  }
});

// Register plugins and start server
server.register([
  require('./plugins/timestamp'),
  require('./plugins/whoami')
], {
  routes: {
    prefix: '/api'    
  }
},(err) => {
  if (err) { console.error('Failed to load a plugin:', err); }

  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });
});

module.exports = server;
