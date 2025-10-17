import { DeleteUserUseCase } from '../../use-cases/user/index.js'
import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFound,
} from '../helpers/index.js'

export class DeleteUserController {
    async execute(HTTPRequest) {
        try {
            const userId = HTTPRequest.params.userId
            const idIsvalid = checkIfIdIsValid(userId)
            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()
            const deleteUser = await deleteUserUseCase.execute(userId)
            if (!deleteUser) {
                return userNotFound()
            }
            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
