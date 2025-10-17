import validator from 'validator'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUserError } from '../errors/user.js'
import { badRequest, ok, serverError } from './helper.js'

export class UpdateUserController {
    async execute(HTTPRequest) {
        try {
            const userId = HTTPRequest.params.userId

            const idIsvalid = validator.isUUID(userId)
            if (!idIsvalid) {
                return badRequest({
                    message: 'The provided id is not Valid',
                })
            }

            const updateUserParams = HTTPRequest.body
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided fields is not allowed',
                })
            }

            if (updateUserParams.password) {
                const passworValid = updateUserParams.password.length < 6
                if (passworValid) {
                    return badRequest({
                        message: 'The password must be at least 6 characters',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailValid = validator.isEmail(updateUserParams.email)
                if (!emailValid) {
                    return badRequest({
                        message: 'The provided email is not valid',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

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
