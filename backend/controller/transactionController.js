import { connection } from "../utils/database.js";

export async function getAll(req, res) {
    const { page = "1", per_page = "10", search = "", month = "1" } = req.query;
    if (!month) res.status(400).json({ status: "unsuccess", message: "Enter Month" })

    const monthNumber = parseInt(month)
    const pageNumber = parseInt(page, 10);
    const perPage = parseInt(per_page, 10);
    const skip = (pageNumber - 1) * perPage;

    let sqlQuery = "SELECT * FROM transaction WHERE MONTH(dateOfSale)=?";
    const sqlParams = [];
    sqlParams.push(monthNumber);


    if (search) {
        sqlQuery += ` AND (title LIKE ? OR description LIKE ? OR price LIKE ?)`;
        const searchParam = `%${search}%`;
        sqlParams.push(searchParam, searchParam, searchParam);
    }

    sqlQuery += ` LIMIT ?, ?`;
    sqlParams.push(skip, perPage);
    console.log(sqlParams)

    connection.query(sqlQuery, sqlParams, (err, result) => {
        if (err) res.status(400).json({ status: "unsuccess", message: "Server Error" });
        connection.query("SELECT COUNT(*) as COUNT FROM transaction WHERE MONTH(dateOfSale)=?", [month], (err, result1) => {
            res.status(200).json({ status: "success", length: result1[0].COUNT, data: result })
        })

    })

}

export async function getStatistics(req, res) {
    const { month } = req.query;
    if (!month) res.status(400).json({ status: "unsuccess", message: "Enter Month" })


    let totalSum = 0;
    let countSoldItems = 0;
    let countUnSoldItems = 0;

    connection.query(" SELECT SUM(CAST(price as DECIMAL(10,5))) as SUM FROM transaction WHERE MONTH(dateOfSale)=?", [month], (err1, result) => {
        if (err1) res.status(400).json({ status: "unsuccess", message: "Server Error" })
        totalSum = result[0].SUM;
        connection.query("SELECT COUNT(*)as COUNT FROM transaction WHERE MONTH(dateOfSale)=? AND SOLD=TRUE", [month], (err2, result) => {
            if (err2) res.status(400).json({ status: "unsuccess", message: "Server Error" })
            countSoldItems = result[0].COUNT;
            connection.query("SELECT COUNT(*)as COUNT FROM transaction WHERE MONTH(dateOfSale)=? AND SOLD=FALSE", [month], (err3, result) => {
                if (err3) res.status(400).json({ status: "unsuccess", message: "Server Error" })
                countUnSoldItems = result[0].COUNT
                res.status(200).json({ status: "success", length: result.length, data: { totalSum, countSoldItems, countUnSoldItems } })
            }
            )
        })
    })
}

export async function getPieDetails(req, res) {
    const { month } = req.query;
    if (!month) res.status(400).json({ status: "unsuccess", message: "Enter Month" })

    connection.query("SELECT COUNT(*) as total,category FROM transaction WHERE MONTH(dateOfSale)=? GROUP BY category", [month], (err, result) => {
        if (err) res.status(400).json({ status: "unsuccess", message: "Server Error" })
        const data = JSON.stringify(result);
        res.status(200).json({ status: "success", length: result.length, data: data })
    })
}

export async function getBarDetails(req, res) {
    const { month } = req.query;

    if (!month) res.status(400).json({ status: "unsuccess", message: "Enter Month" })

    const query = `SELECT
            SUM(CASE WHEN price BETWEEN 0 AND 100 THEN 1 ELSE 0 END) AS '0-100',
            SUM(CASE WHEN price BETWEEN 101 AND 200 THEN 1 ELSE 0 END) AS '101-200',
            SUM(CASE WHEN price BETWEEN 201 AND 300 THEN 1 ELSE 0 END) AS '201-300',
            SUM(CASE WHEN price BETWEEN 301 AND 400 THEN 1 ELSE 0 END) AS '301-400',
            SUM(CASE WHEN price BETWEEN 401 AND 500 THEN 1 ELSE 0 END) AS '401-500',
            SUM(CASE WHEN price BETWEEN 501 AND 600 THEN 1 ELSE 0 END) AS '501-600',
            SUM(CASE WHEN price BETWEEN 601 AND 700 THEN 1 ELSE 0 END) AS '601-700',
            SUM(CASE WHEN price BETWEEN 701 AND 800 THEN 1 ELSE 0 END) AS '701-800',
            SUM(CASE WHEN price BETWEEN 801 AND 900 THEN 1 ELSE 0 END) AS '801-900',
            SUM(CASE WHEN price > 900 THEN 1 ELSE 0 END) AS '901-above'
        FROM transaction
        WHERE MONTH(dateOfSale) = ?`

    connection.query(query, [month], (err, result) => {
        if (err) res.status(400).json({ status: "unsuccess", message: "Server Error" })

        res.status(200).json({ status: "success", data: result })

    })
}

export async function fetchAll(req, res) {
    const { month } = req.query;
    if (!month) res.status(400).json({ status: "unsuccess", message: "Enter Month" })
    let finalOp = {}
    const statisticsData = await fetch(`http://localhost:4000/api/transaction/statistics?month=${month}`);
    const resStatisticsData = await statisticsData.json();
    finalOp = { ...finalOp, statisticsData: resStatisticsData.data };

    const barChartData = await fetch(`http://localhost:4000/api/transaction/barchart?month=${month}`);
    const resBarChartData = await barChartData.json();
    finalOp = { ...finalOp, barChartData: resBarChartData.data };

    const pieData = await fetch(`http://localhost:4000/api/transaction/pie?month=${month}`);
    const resPieData = await pieData.json();
    finalOp = { ...finalOp, pieData: resPieData.data };


    res.status(200).json({ status: "success", data: finalOp })
}