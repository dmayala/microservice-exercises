'use strict';

describe('Timestamp Microservice', () => {

  const endpoint = '/api/timestamp/';

  describe('GET /timestamp', () => {
    it('returns natural and unix when given natural date', (done) => {

      const options = {
        method: 'GET',
        url: endpoint + 'Janurary 1, 2016'
      };

      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('unix', '1451635200');
        expect(response.result).to.have.property('natural', 'January 1, 2016');
        done();
      });
    });

    it('returns natural and unix when given unix timestamp', (done) => {

      const options = {
        method: 'GET',
        url: endpoint + '1451635200'
      };

      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('unix', '1451635200');
        expect(response.result).to.have.property('natural', 'January 1, 2016');
        done();
      });
    });

    it('returns null when not given natural or unix timestamp', (done) => {

      const options = {
        method: 'GET',
        url: endpoint + 'Junk Data'
      };

      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('unix', null);
        expect(response.result).to.have.property('natural', null);
        done();
      });
    });

  });
});
