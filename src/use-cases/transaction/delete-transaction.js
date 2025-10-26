export class DeleteTransactionUseCase {
    constructor(postgresUpadateTransactionRepository) {
        this.postgresUpadateTransactionRepository =
            postgresUpadateTransactionRepository
    }
    async execute(transactionId) {
        const deleteTransaction =
            await this.postgresUpadateTransactionRepository.execute(
                transactionId,
            )
        return deleteTransaction
    }
}
