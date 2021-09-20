import { HttpResponse } from "../protocols/Http";

export const fail = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const success = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body,
  };
};
