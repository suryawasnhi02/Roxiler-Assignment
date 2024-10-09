import express from "express"
import cors from "cors"
import { devDataRouter } from "./routes/devData.js";
import { transactionRouter } from "./routes/transactions.js";

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/api/devData", devDataRouter)
app.use("/api/transaction", transactionRouter)



export { app };



