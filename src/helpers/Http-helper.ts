import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../protocols/Http";

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const fail = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
