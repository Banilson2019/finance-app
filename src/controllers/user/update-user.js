import { EmailAlreadyInUserError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'

import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFound,
    badRequest,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(HTTPRequest) {
        try {
            const userId = HTTPRequest.params.userId

            const idIsvalid = checkIfIdIsValid(userId)
            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const params = HTTPRequest.body

            await updateUserSchema.parseAsync(params)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )
            if (!updateUser) {
                return userNotFound()
            }

            return ok(updateUser)
        } catch (error) {
            if (error instanceof ZodError) {
                const isNotRequiredFields = error.issues.find(
                    (issue) => issue.code === 'unrecognized_keys',
                )
                if (isNotRequiredFields) {
                    return badRequest({
                        message: 'Some provided fields are not allowed',
                    })
                }
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({
                    message: error.message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
