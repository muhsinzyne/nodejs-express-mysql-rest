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
  models: [path.resolve(__dirname, '../../src/models/*.ts')], // Use a glob pattern
  logging: false, // Disable SQL query logging for production
});

sequelize
  .authenticate()
  .then(() => {
    console.log('sequelize Connection established successfully.');
  })
  .catch((err) => {
    console.error('sequelize Unable to connect to the database:', err);
  });

export default sequelize;
