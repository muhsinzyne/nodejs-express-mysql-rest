import dotenv from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: envFile });

const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Ensure this is included and matches your database type
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Ensure this is included
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database_name',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Ensure this is included
  },
};

module.exports = config;
