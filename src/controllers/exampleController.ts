import { Request, Response } from "express";
import pool from "../config/database";

export const getExample = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM example_table");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};
