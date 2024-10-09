import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'assignment'
});

connection.connect(() => {
    console.log("DB connected")
});

export { connection }