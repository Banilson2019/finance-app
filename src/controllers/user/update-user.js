import { EmailAlreadyInUserError } from '../../errors/user.js'

import {
    ok,
    serverError,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
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

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided fields is not allowed',
                })
            }

            if (params.password) {
                const passworValid = checkIfPasswordIsValid(params.password)
                if (!passworValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailValid = checkIfEmailIsValid(params.email)
                if (!emailValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )
            if (!updateUser) {
                return userNotFound()
            }

            return ok(updateUser)
        } catch (error) {
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
