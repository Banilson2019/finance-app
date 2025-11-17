import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetTransactionByUserIdRepository {
    async execute(userId) {
        try {
            return await prisma.transaction.findMany({
                where: {
                    user_id: userId,
                },
            })
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
