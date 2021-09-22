import { Router } from "express";
import { adaptRoute } from "../main/adapters/AdaptRoute";
import { makeDecodeUrlController } from "../main/factories/controllers/DecodeUrlControllersFactory";
import { makeEncodeUrlController } from "../main/factories/controllers/EncodeUrlControllersFactory";

const routes = Router();

routes.post("/encode", adaptRoute(makeEncodeUrlController()));
routes.post("/decode",adaptRoute(makeDecodeUrlController()));

// routes.get("/:code", adaptRoute(EncodeUrlController.handle));

export default routes;
