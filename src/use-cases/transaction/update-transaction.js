export class UpdateTransactionUseCase {
    constructor(postgresUpadateTransactionRepository) {
        this.postgresUpadateTransactionRepository =
            postgresUpadateTransactionRepository
    }
    async execute(transactionId, params) {
        const updateTransaction =
            await this.postgresUpadateTransactionRepository.execute(
                transactionId,
                params,
            )
        return updateTransaction
    }
}
