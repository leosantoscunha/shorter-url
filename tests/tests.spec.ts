import { Chance } from "chance";
import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";

import { URLValidator } from "../src/protocols/URLValidator";
import { EncodeUrlController } from "../src/controllers/EncodeUrlController";
import { URLValidatorAdapter } from "../src/utils/URLValidatorAdapter";
import { InMemory } from "../src/database/InMemory";

import { DecodeUrlController } from "../src/controllers/DecodeUrlController";
import app from "../src/server";

const chance = new Chance();
const urlRepository = InMemory.getInstance();

const makeEncodeUrlController = (): any => {
  class URLValidatorStub implements URLValidator {
    isValid(url: string): boolean {
      return true;
    }
  }
  const urlValidatorStub = new URLValidatorStub();
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
    const { encodeUrlController, urlValidatorStub } = makeEncodeUrlController();
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
    const { decodeUrlController, urlValidatorStub } = makeDecodeUrlController();
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
    const mockUrl =
      "https://www.musclefood.com/bundles/slimming-meat-hampers.html";

    const httpRequest = {
      body: {
        url: mockUrl,
      },
    };

    const httpReponse = await encodeUrlController.handle(httpRequest);
    expect(httpReponse.statusCode).to.equal(200);
    expect(httpReponse.body.url).to.not.be.null;

    const httpReponseDecode = await decodeUrlController.handle({
      body: {
        url: httpReponse.body.url,
      },
    });
    expect(httpReponseDecode.body.url).to.be.equal(mockUrl);
  });

  describe("URLValidator Adapter", () => {
    it("Should return false if validator return false", (done) => {
      const urlValidatorAdapter = new URLValidatorAdapter();
      const isValid = urlValidatorAdapter.isValid(chance.word());
      expect(isValid).to.be.equal(false);
      done();
    });
  });
});

describe("GET /redirect", () => {
  const mockUrl =
    "https://www.musclefood.com/bundles/slimming-meat-hampers.html";
  const agent = request(app);

  it("should return 200 if an valid url is provided when encode", async () => {
    await agent
      .post("/encode")
      .type("json")
      .send({ body: { url: mockUrl } })
      .then((response) => {
        const {
          statusCode,
          body: { url },
        } = response;
        expect(statusCode).to.equal(200);
        expect(url).not.be.null;
      });
  });

  it("should return 200 if an valid url is provided when decode", async () => {
    await agent
      .post("/encode")
      .type("json")
      .send({ body: { url: mockUrl } })
      .then(async (response) => {
        const {
          statusCode: encodeStatus,
          body: { url },
        } = response;
        expect(encodeStatus).to.equal(200);
        expect(url).not.be.null;
        await agent
          .post("/decode")
          .type("json")
          .send({ body: { url } })
          .then((response) => {
            const { statusCode, body } = response;
            expect(statusCode).to.equal(200);
            expect(body.url).to.equal(mockUrl);
            expect(body.url).not.be.null;
          });
      });
  });

  it("should return 301 if an valid url is provided and make redirect", async () => {
    let pathname: string;

    await agent
      .post("/encode")
      .type("json")
      .send({ body: { url: mockUrl } })
      .then(async (response) => {
        const { body, statusCode } = response;
        expect(statusCode).to.equal(200);
        expect(body.url).not.be.null;

        pathname = new URL(body.url).pathname;
        return await agent
          .get(pathname)
          .type("json")
          .then((response) => {
            const { header, statusCode } = response;
            expect(header.location).to.equal(mockUrl);
            expect(statusCode).to.equal(301);
          });
      });
  });
});
