import { EmailAlreadyInUserError } from '../../errors/user.js'
import { badRequest, created, serverError } from '../helpers/index.js'

import { ZodError } from 'zod'
import { createUserSchema } from '../../schemas/index.js'

export class CreateUserController {
    constructor(createUseCase) {
        this.createUseCase = createUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createUser = await this.createUseCase.execute(params)

            return created(createUser)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({
                    message: error.message,
                })
            }
            return serverError()
        }
    }
}
