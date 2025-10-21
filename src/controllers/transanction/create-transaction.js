import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    serverError,
    validateRequireFields,
} from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: someRequiredFieldsWereProvided, missingField } =
                validateRequireFields(params, requiredFields)

            if (!someRequiredFieldsWereProvided) {
                return badRequest({
                    message: `The fields ${missingField} is required.`,
                })
            }

            const userId = params.user_id
            const idValid = checkIfIdIsValid(userId)
            if (!idValid) {
                return invalidIdResponse()
            }

            const amountIsValid = checkIfAmountIsValid(params.amount)

            if (!amountIsValid) {
                return invalidAmountResponse()
            }

            const type = params.type.trim().toUpperCase()
            const typeIsValid = checkIfTypeIsValid(params.type)
            if (!typeIsValid) {
                return invalidTypeResponse()
            }

            const createTransaction =
                await this.createTransactionUseCase.execute({ ...params, type })

            return created(createTransaction)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return badRequest({
                    message: error.message,
                })
            }

            return serverError()
        }
    }
}
