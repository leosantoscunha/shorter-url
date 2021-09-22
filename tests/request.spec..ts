import request from 'supertest';
import { EncodeUrlController } from '../src/controllers/EncodeUrlController';
import { InMemory } from '../src/database/InMemory';
import app from '../src/server'
import { URLValidatorAdapter } from '../src/utils/URLValidatorAdapter';
import { makeMockRecords } from './factories/Url-factory';

describe('GET /redirect', function() {
  it('should redirect to the correct link from the original url ', done => {
    const mockUrl = 'https://www.musclefood.com/bundles/slimming-meat-hampers.html';
    request(app)
      .post('/encode')
      .send({
        body: {
          url: mockUrl,
        }
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        console.log(res.body)
        if (err) return done(err);
        return done();
      });
      // .then(function (res) {
      //   console.log(res.body.url)
      //   done()
      //   // var pathname = new URL(res.body.url).pathname;

      //   // request(app)
      //   //   .get(pathname)
      //   //   .set('Accept', 'application/json')
      //   //   .end(done);
      // }).catch(done);

    

  });
});