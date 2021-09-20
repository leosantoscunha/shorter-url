/* eslint-disable class-methods-use-this */
import { Chance } from "chance";
import { expect } from "chai";

import { URLValidator } from "../src/protocols/URLValidator";
import { ShorterUrlController } from "../src/controllers/ShorterUrlController";
import { URLValidatorAdapter } from "../src/utils/URLValidatorAdapter";
import { InMemory } from "../src/database/InMemory";

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
  const urlRepository = new InMemory();
  const shorterUrlController = new ShorterUrlController(
    urlValidatorStub,
    urlRepository
  );
  return {
    shorterUrlController,
    urlValidatorStub,
  };
};

describe("Shorter Url Service", () => {
  it("shound return 400 if no url is provided when encode", () => {
    const { shorterUrlController } = makeShorterUrlController();
    const httpRequest = {
      body: {},
    };
    const httpReponse = shorterUrlController.encode(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("MissingParamError");
    expect(httpReponse.body.message).to.be.equal("Missing param: url");
  });

  it("shound return 400 if no url is provided when encode", () => {
    const { shorterUrlController } = makeShorterUrlController();
    const httpRequest = {
      body: {},
    };
    const httpReponse = shorterUrlController.encode(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("MissingParamError");
    expect(httpReponse.body.message).to.be.equal("Missing param: url");
  });

  it("shound return 400 if an invalid url is provided when encode", () => {
    const { shorterUrlController, urlValidatorStub } =
      makeShorterUrlController();
    const isValid = sinon.stub(urlValidatorStub, "isValid");
    isValid(false);

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = shorterUrlController.encode(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("InvalidParamError");
    expect(httpReponse.body.message).to.be.equal("Invalid param: url");
  });

  it("shound return 200 if an valid url is provided when encode", () => {
    const { shorterUrlController, urlValidatorStub } =
      makeShorterUrlController();

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = shorterUrlController.encode(httpRequest);
    expect(httpReponse.statusCode).to.equal(200);
  });
  
  describe("URLValidator Adapter", () => {
    it("Should return false if validator return false", () => {
      const urlValidatorAdapter = new URLValidatorAdapter();
      const isValid = urlValidatorAdapter.isValid(chance.word());
      expect(isValid).to.be.equal(false);
    });
  });
});
