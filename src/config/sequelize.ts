import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import config from './config';
// Create a Sequelize instance

const sequelize = new Sequelize({
  dialect: 'mysql', // Change to your database type (e.g., 'postgres', 'sqlite')
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  models: [path.join(__dirname, '../models')], // Path to your models folder
  logging: false, // Disable SQL query logging for production
});

export default sequelize;
