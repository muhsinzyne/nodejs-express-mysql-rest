import { Router } from "express";
import { getExample } from "../controllers/exampleController";

const apiRoute = Router();

apiRoute.get("/example", getExample);

export default apiRoute;
