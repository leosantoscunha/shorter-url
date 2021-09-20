import Chance from "chance";

const chance = new Chance();

export const makeMockRecords = (): any => {
  return {
    url: chance.url()
  }
}