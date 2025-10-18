import validator from 'validator'
import { userNotFound, badRequest, ok, serverError } from '../helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(HTTPRequsest) {
        try {
            const isIdValid = validator.isUUID(HTTPRequsest.params.userId)
            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid',
                })
            }

            const user = await this.getUserByIdUseCase.execute(
                HTTPRequsest.params.userId,
            )
            if (!user) {
                return userNotFound()
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
