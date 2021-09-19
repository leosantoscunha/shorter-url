// import { Chance } from 'chance';
import { expect, assert } from 'chai';
import { ShorterUrlController } from '../../app/controllers/ShorterUrlController';

// const chance = new Chance();

describe('Shorter Url Service', () => {
  it('shound return 400 if no url is provided', () => {
    const shorterUrlController = new ShorterUrlController();
    const httpRequest = {
      body: {
        url: ''
      }
    }
    const httpReponse = shorterUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400)
    expect(httpReponse.body).to.be.an('error')
  });
});
