import { Router } from "express";
import { ShorterUrlController } from "src/controllers/ShorterUrlController";
import { URLValidatorAdapter } from "src/utils/URLValidatorAdapter";
import { InMemory } from "src/database/InMemory";

const routes = Router();

// routes.get(
//   "/redirect",
//   new ShorterUrlController(new URLValidatorAdapter()).redirect
// );

routes.post(
  "/encode",
  new ShorterUrlController(new URLValidatorAdapter(), new InMemory()).encode
);

routes.get(
  "/decode",
  new ShorterUrlController(new URLValidatorAdapter(), new InMemory()).decode
);

export default routes;
