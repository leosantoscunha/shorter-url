import { Chance } from "chance";
import { expect } from "chai";

import { URLValidator } from "../src/protocols/URLValidator";
import { EncodeUrlController } from "../src/controllers/EncodeUrlController";
import { URLValidatorAdapter } from "../src/utils/URLValidatorAdapter";
import { InMemory } from "../src/database/InMemory";

import { makeMockRecords } from "./factories/Url-factory"
import { DecodeUrlController } from "../src/controllers/DecodeUrlController";
const sinon = require("sinon");

const chance = new Chance();

const makeEncodeUrlController = (): any => {
  class URLValidatorStub implements URLValidator {
    isValid(url: string): boolean {
      return true;
    }
  }
  const urlValidatorStub = new URLValidatorStub();
  const urlRepository = new InMemory();
  const encodeUrlController = new EncodeUrlController(
    urlValidatorStub,
    urlRepository
  );
  return {
    encodeUrlController,
    urlValidatorStub,
  };
};

const makeDecodeUrlController = (): any => {
  class URLValidatorStub implements URLValidator {
    isValid(url: string): boolean {
      return true;
    }
  }
  const urlValidatorStub = new URLValidatorStub();
  const urlRepository = new InMemory();
  const decodeUrlController = new DecodeUrlController(
    urlValidatorStub,
    urlRepository
  );
  return {
    decodeUrlController,
    urlValidatorStub,
  };
};


describe("Shorter Url Service", () => {

  beforeEach(()=>{
    const loops = chance.integer({min:5, max:20});
        const { encodeUrlController } = makeEncodeUrlController();

    for (let index = 0; index < loops; index++) {
      const element = makeMockRecords();
      const httpRequest = {
        body: element,
      };
      encodeUrlController.handle(httpRequest);
    }

  });

  it("should return 400 if no url is provided when encode", async () => {
    const { encodeUrlController } = makeEncodeUrlController();
    const httpRequest = {
      body: {},
    };
    const httpReponse = await encodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("MissingParamError");
    expect(httpReponse.body.message).to.be.equal("Missing param: url");
  });

  it("should return 400 if an invalid url is provided when encode", async () => {
    const { encodeUrlController, urlValidatorStub } =
      makeEncodeUrlController();
    const isValid = sinon.stub(urlValidatorStub, "isValid");
    isValid(false);

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = await encodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("InvalidParamError");
    expect(httpReponse.body.message).to.be.equal("Invalid param: url");
  });

  it("should return 200 if an valid url is provided when encode", async () => {
    const { encodeUrlController } = makeEncodeUrlController();

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = await encodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(200);
  });
  
  it("should return 400 if no url is provided when decode", async () => {
    const { decodeUrlController } = makeDecodeUrlController();
    const httpRequest = {
      body: {},
    };
    const httpReponse = await decodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("MissingParamError");
    expect(httpReponse.body.message).to.be.equal("Missing param: url");
  });

  it("should return 400 if an invalid url is provided when decode", async () => {
    const { decodeUrlController, urlValidatorStub } =
      makeDecodeUrlController();
    const isValid = sinon.stub(urlValidatorStub, "isValid");
    isValid(false);

    const httpRequest = {
      body: {
        url: chance.url(),
      },
    };

    const httpReponse = await decodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(400);
    expect(httpReponse.body).to.be.an("error");
    expect(httpReponse.body.name).to.be.equal("InvalidParamError");
    expect(httpReponse.body.message).to.be.equal("Invalid param: url");
  });

  it("should return 200 if an valid url is provided when decode", async () => {
    const { encodeUrlController } = makeEncodeUrlController();
    const { decodeUrlController } = makeDecodeUrlController();
    const mockUrl = 'https://www.musclefood.com/bundles/slimming-meat-hampers.html';

    const httpRequest = {
      body: {
        url: mockUrl,
      },
    };

    const httpReponse = await encodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(200);
    expect(httpReponse.body.url).to.not.be.null;

    console.log(httpReponse)
    const httpReponseDecode = await decodeUrlController.handle({
      body: {
        url: httpReponse.body.url
      }
    });
    console.log(httpReponseDecode)

    expect(httpReponseDecode.body.url).to.be.equal(mockUrl);
  });

  describe("URLValidator Adapter", () => {
    it("Should return false if validator return false", async () => {
      const urlValidatorAdapter = new URLValidatorAdapter();
      const isValid = urlValidatorAdapter.isValid(chance.word());
      expect(isValid).to.be.equal(false);
    });
  });
});
