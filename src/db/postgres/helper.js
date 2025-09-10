import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
})

export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect()
        try {
            const results = await client.query(query, params)
            return results.rows
        } finally {
            client.release()
        }
    },
}
