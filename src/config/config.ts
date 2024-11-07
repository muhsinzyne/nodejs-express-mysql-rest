import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: envFile });

export default {
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbUser: process.env.DB_USER || 'demo_user',
  dbPassword: process.env.DB_PASSWORD || 'demo_password',
  dbName: process.env.DB_NAME || '',
  dbPort: process.env.DB_PORT || 3306,
  dbType: process.env.DB || 'mysql',
  port: Number(process.env.PORT) || 3000,
  redisHost: process.env.REDIS_HOST || '127.0.0.1',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
};
