import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransictionRepository {
    async execute(createTransactionParams) {
        return await prisma.transaction.create({
            data: createTransactionParams,
        })
    }
}
