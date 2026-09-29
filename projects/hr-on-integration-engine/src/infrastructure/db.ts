import pg from 'pg';
const { Pool } = pg;

/**
 * PostgreSQL Connection Pool Configured for Serverless Environments
 * (RDS Proxy / Supabase Transaction Mode)
 * Best practice: Limit max connections per container and set idle timeout.
 */
let poolInstance: pg.Pool | null = null;

export function getDbPool(): pg.Pool {
    if (!poolInstance) {
        poolInstance = new Pool({
            connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hron_production',
            max: 5, // Keep low in serverless containers to avoid connection exhaustion
            idleTimeoutMillis: 10000,
            connectionTimeoutMillis: 3000,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        });

        poolInstance.on('error', (err) => {
            console.error('Unexpected error on idle PostgreSQL client:', err);
        });
    }
    return poolInstance;
}

export async function executeQuery<T extends pg.QueryResultRow = pg.QueryResultRow>(
    text: string, 
    params?: unknown[]
): Promise<T[]> {
    const pool = getDbPool();
    const client = await pool.connect();
    try {
        const res = await client.query<T>(text, params);
        return res.rows;
    } finally {
        client.release();
    }
}
