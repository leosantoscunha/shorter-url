import { Router } from "express";
import { adaptRedirectRoute } from "../main/adapters/AdaptRedirectRoute";
import { adaptRoute } from "../main/adapters/AdaptRoute";
import { makeDecodeUrlController } from "../main/factories/controllers/DecodeUrlControllersFactory";
import { makeEncodeUrlController } from "../main/factories/controllers/EncodeUrlControllersFactory";
import { makeRedirectController } from "../main/factories/controllers/RedirectControllersFactory";

const routes = Router();

routes.post("/encode", adaptRoute(makeEncodeUrlController()));
routes.post("/decode",adaptRoute(makeDecodeUrlController()));
routes.get("/:code", adaptRedirectRoute(makeRedirectController()));

export default routes;
