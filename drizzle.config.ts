import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config();

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  strict: true,
} satisfies Config;
