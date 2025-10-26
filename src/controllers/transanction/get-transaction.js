import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    badRequest,
} from '../helpers/index.js'
import { requiredFieldIsMissingResponse } from '../helpers/validation.js'

export class GetTransanctionByUserIdController {
    constructor(getTransanctionByUserIdUseCase) {
        this.getTransanctionByUserIdUseCase = getTransanctionByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            const isValidUserId = checkIfIdIsValid(userId)
            if (!isValidUserId) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransanctionByUserIdUseCase.execute({ userId })
            console.log(transactions)
            return ok(transactions)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return badRequest({
                    message: error.message,
                })
            }
        }
    }
}
