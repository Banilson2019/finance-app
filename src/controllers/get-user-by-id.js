import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import validator from 'validator'
import { badRequest, ok, serverError } from './helper.js'

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

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
