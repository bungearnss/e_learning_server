var mysql = require('mysql');

/* localhost database */
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_learning"
});

module.exports = db;