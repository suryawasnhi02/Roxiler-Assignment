import { app } from "./app.js";
import { connection } from "./utils/database.js";

app.listen(4000, () => {
    console.log("Server is Started")
})

