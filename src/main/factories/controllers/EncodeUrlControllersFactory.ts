import { EncodeUrlController } from "../../../controllers/EncodeUrlController"
import { Controller } from "../../../protocols/Controller"
import { URLValidatorAdapter } from "../../../utils/URLValidatorAdapter"
import { InMemory } from "../../../database/InMemory"

export const makeEncodeUrlController = (): Controller => {
    const controller = new EncodeUrlController(new URLValidatorAdapter(), new InMemory().getInstance())
    return controller
  }