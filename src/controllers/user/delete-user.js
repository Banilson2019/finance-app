import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFound,
} from '../helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(HTTPRequest) {
        try {
            const userId = HTTPRequest.params.userId
            const idIsvalid = checkIfIdIsValid(userId)
            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const deleteUser = await this.deleteUserUseCase.execute(userId)
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
