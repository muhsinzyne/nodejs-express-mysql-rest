import { Request, Response } from 'express';
import pool from '../config/database';

import { User } from '../models/User';
import sequelize from '../config/sequelize';
import { AppDataSource } from '../config/db-adapter/type-orm';
import { User as User2 } from '../orm-models/typeorm/User';

export const getExample = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

export const adapter = async (req: Request, res: Response) => {
  try {
    await sequelize.sync();
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

export const typeOrm = async (req: Request, res: Response) => {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User2);

    console.log(userRepository); // Should log the User entity

    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};
