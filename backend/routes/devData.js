import express from "express";
import { insertAll } from "../controller/devDataController.js";

const devDataRouter = express.Router();

devDataRouter.get("/insert", insertAll);

export { devDataRouter }