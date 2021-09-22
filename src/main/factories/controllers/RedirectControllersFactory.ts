import { Controller } from "../../../protocols/Controller"
import { URLValidatorAdapter } from "../../../utils/URLValidatorAdapter"
import { InMemory } from "../../../database/InMemory"
import { RedirectController } from "../../../controllers/RedirectController"

export const makeRedirectController = (): Controller => {
   return new RedirectController(new URLValidatorAdapter(), InMemory.getInstance())
 }