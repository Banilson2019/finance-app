import { PostgresHelper } from '../../../db/postgres/helper.js'
export class PostgresGetUSerBalanceRepository {
    async execute(userId) {
        const balance = await PostgresHelper.query(
            `
            SELECT 
                SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earning,
                SUM(CASE WHEN type='EXPONSE' THEN amount ELSE 0 END) AS exponse,
                SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investment,
                    (SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) -
                    SUM(CASE WHEN type='EXPONSE' THEN amount ELSE 0 END) -
                    SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)) AS balance
            FROM transaction
            WHERE user_id = $1;
            `,
            [userId],
        )

        return {
            userId,
            ...balance[0],
        }
    }
}
