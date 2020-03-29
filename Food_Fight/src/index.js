const mysql = require('mysql');

var con = mysql.createConnection({
    host: "fasogris.freeboxos.fr",
    user: "client",
    password: "warriorsofthebaguette"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});