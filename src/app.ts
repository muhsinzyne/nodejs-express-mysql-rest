import express from "express";
import dotenv from "dotenv";
import apiRoute from "./routes";

const envFile = `.env.${process.env.NODE_ENV || "local"}`;
dotenv.config({ path: envFile });

//console.log(process.env);
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
} else {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
}

const app = express();
app.use(express.json());
app.use("/api/v1", apiRoute);

export default app;
