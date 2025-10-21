import validator from 'validator'
import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
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

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0.',
                })
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency',
                })
            }

            const type = params.type.trim().toUpperCase()
            const typeIsValid = ['EARNING', 'EXPONSE', 'INVESTMENT'].includes(
                type,
            )
            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING EXPONSE or INVESTMENT.',
                })
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
