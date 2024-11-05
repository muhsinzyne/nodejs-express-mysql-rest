import dotenv from 'dotenv';

dotenv.config();

export default {
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbUser: process.env.DB_USER || 'demo_user',
  dbPassword: process.env.DB_PASSWORD || 'demo_password',
  dbName: process.env.DB_NAME || '',
  dbPort: process.env.DB_PORT || 3306,
  dbType: process.env.DB || 'mysql',
  port: Number(process.env.PORT) || 3000,
};