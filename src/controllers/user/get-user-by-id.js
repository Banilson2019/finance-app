import { GetUserByIdUseCase } from '../../use-cases/user/index.js'
import validator from 'validator'
import { userNotFound, badRequest, ok, serverError } from '../helpers/index.js'

export class GetUserByIdController {
    async execute(HTTPRequsest) {
        try {
            const isIdValid = validator.isUUID(HTTPRequsest.params.userId)
            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid',
                })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(
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
