/* eslint-disable @typescript-eslint/no-require-imports */
import { DataSource } from 'typeorm';
import config from '../config';
import { User } from '../../orm-models/typeorm/User';

// const loadEntities = (directory: string) => {
//   const entities = [];

//   const files = readdirSync(directory);
//   for (const file of files) {
//     const filePath = join(directory, file);
//     if (file.endsWith('.ts')) {
//       // Ensure it's a TypeScript file
//       const entity = require(filePath);
//       entities.push(entity.default || entity); // Handle default and named exports
//     }
//   }

//   return entities;
// };

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true, // Set to false in production
  logging: true,
  entities: [User], // Specify your entities directory
});

export const connectToTypeORMDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
