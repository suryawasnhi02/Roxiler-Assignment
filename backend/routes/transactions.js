import express from "express";
import { fetchAll, getAll, getBarDetails, getPieDetails, getStatistics } from "../controller/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/all", getAll);
transactionRouter.get("/statistics", getStatistics);
transactionRouter.get("/pie", getPieDetails);
transactionRouter.get("/barchart", getBarDetails)
transactionRouter.get("/fetchAll", fetchAll);

export { transactionRouter }