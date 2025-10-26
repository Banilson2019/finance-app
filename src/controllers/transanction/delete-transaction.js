import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    ivalidTransactionNotFound,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const idIsvalid = checkIfIdIsValid(httpRequest.params.transactionId)
            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const deleteTransaction =
                await this.deleteTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                )
            if (!deleteTransaction) {
                return ivalidTransactionNotFound()
            }

            return ok(deleteTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
