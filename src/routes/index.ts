import { Router } from "express";
import { ShorterUrlController } from "../controllers/ShorterUrlController";
import { InMemory } from "../database/InMemory";
import { URLValidatorAdapter } from "../utils/URLValidatorAdapter";

const routes = Router();
const shorterUrlController = new ShorterUrlController(new URLValidatorAdapter(), new InMemory());

routes.post("/encode", shorterUrlController.encode);

routes.post("/decode",shorterUrlController.decode);

routes.get("/:code", shorterUrlController.redirect);

export default routes;
