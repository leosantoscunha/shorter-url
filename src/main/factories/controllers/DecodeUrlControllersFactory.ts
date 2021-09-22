import { DecodeUrlController } from "../../../controllers/DecodeUrlController"
import { Controller } from "../../../protocols/Controller"
import { URLValidatorAdapter } from "../../../utils/URLValidatorAdapter"
import { InMemory } from "../../../database/InMemory"

export const makeDecodeUrlController = (): Controller => {
    const controller = new DecodeUrlController(new URLValidatorAdapter(), new InMemory())
    return controller
  }