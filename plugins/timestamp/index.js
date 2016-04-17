'use strict';

function naturalize(dateObj) {
  return new Intl.DateTimeFormat('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(dateObj);
}

function isUnix(time) {
  return /^\d{10}$/.test(time);
}

function isNatural(time) {
  if (isNaN(Number(time))) {
    return !isNaN(new Date(time).valueOf());
  }

  return false;
}

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/timestamp/{time}',
        handler: function (request, reply) {
          let time = request.params.time;
          
          if (isUnix(time) || isNatural(time)) {
            let date = isNaN(Number(time)) ? new Date(time) : new Date(Number(time) * 1000);
            
            return reply({
              unix: (date.getTime()/1000).toFixed(),
              natural: naturalize(date)
            });
          }

          return reply({
            unix: null,
            natural: null
          });
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
