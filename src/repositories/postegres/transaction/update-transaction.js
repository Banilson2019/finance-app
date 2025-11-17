import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpadateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        return await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        })
    }
}
