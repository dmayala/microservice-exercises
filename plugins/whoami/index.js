'use strict';

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/whoami',
    handler: function (request, reply) {
      //let { host, accept-language, user-agent } = request.headers;
      const headers = request.headers;
      console.log(request.info);

      return reply({
        ipAddress: request.info.remoteAddress,
        language: headers['accept-language'].split(',')[0],
        software: headers['user-agent'].split(')')[0].split('(')[1]
      });
    }
  });

  next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
