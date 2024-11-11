import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Set to false in production
  logging: false,
  entities: ['src/typeorm/models/**/*.ts'], // Path to your entity files
  migrations: ['src/typeorm/migrations/**/*.ts'], // Path to your migration files
  subscribers: ['src/typeorm/subscribers/**/*.ts'],
  migrationsTableName: 'db_migrations',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
