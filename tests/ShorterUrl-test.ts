/* eslint-disable class-methods-use-this */
import { Chance } from "chance";
import { expect } from "chai";

import { URLValidator } from "../src/protocols/URLValidator";
import { ShorterUrlController } from "../src/controllers/ShorterUrlController";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require("sinon");

const chance = new Chance();

const makeShorterUrlController = (): any => {
  class URLValidatorStub implements URLValidator {
    isValid(url: string): boolean {
      return true;
    }
  }
  const urlValidatorStub = new URLValidatorStub();
  const shorterUrlController = new ShorterUrlController(urlValidatorStub);
  return {
    shorterUrlController,
    urlValidatorStub,
  };
};

describe("Shorter Url Service", () => {
  it("shound return 400 if no url is provided", () => {
    const { shorterUrlController } = makeShorterUrlController();
    const httpRequest = {
      body: {},
    };
    const httpReponse = shorterUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
  });

  it("shound return 400 if an invalid url is provided", () => {
    const { shorterUrlController, urlValidatorStub } =
      makeShorterUrlController();
    const isValid = sinon.stub(urlValidatorStub, "isValid");
    isValid(false);

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = shorterUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
  });

  it("shound return 200 if an valid url is provided", () => {
    const { shorterUrlController } = makeShorterUrlController();

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = shorterUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(200);
  });
});
