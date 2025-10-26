import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const idIsvalid = checkIfIdIsValid(transactionId)
            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body
            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided fields is not allowed',
                })
            }

            if (params.amount) {
                const amountValid = checkIfAmountIsValid(params.amount)
                if (!amountValid) {
                    return invalidAmountResponse()
                }
            }
            if (params.type) {
                const typeValid = checkIfTypeIsValid(params.type)
                if (!typeValid) {
                    return invalidTypeResponse()
                }
            }

            const updateTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            return ok(updateTransaction)
        } catch (error) {
            console.error(error)
            serverError()
        }
    }
}
