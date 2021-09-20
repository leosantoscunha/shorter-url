// import { HttpResponse } from "../protocols/Controller";

export const fail = (error: Error): any => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const success = (body: any): any => {
  return {
    statusCode: 200,
    body,
  };
};
