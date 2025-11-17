import { Prisma } from '@prisma/client'
import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUSerBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalExpense },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })

        const {
            _sum: { amount: totalInvestment },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        })

        const _totalEarning = totalEarnings || new Prisma.Decimal(0)
        const _totalExpense = totalExpense || new Prisma.Decimal(0)
        const _totalInvestment = totalInvestment || new Prisma.Decimal(0)

        const balance = new Prisma.Decimal(
            _totalEarning - _totalExpense - _totalInvestment,
        )

        return {
            earning: _totalEarning,
            expense: _totalExpense,
            investment: _totalInvestment,
            balance,
        }
    }
}
