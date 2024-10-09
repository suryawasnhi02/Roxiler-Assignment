import { connection } from "../utils/database.js";

export async function insertAll(req, res) {
    const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const data = await response.json();


    data.forEach((element) => {
        connection.query(`INSERT INTO transaction VALUES(?,?,?,?,?,?,?,?)`, [element.id, element.title, element.price, element.description, element.category, element.image, element.sold, element.dateOfSale], function (err, result) {
            if (err) throw err;
        })
    })



    res.send();
}