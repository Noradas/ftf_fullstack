const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "mysql-noradas.alwaysdata.net",
    user: "noradas",
    password: "noradas@12345",
    database: "noradas_ftftfullstack",


});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM foots";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { name, lastname, wins, losses } = req.body;
    const sqlInsert = "INSERT INTO foots (name, lastname, wins, losses) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [name, lastname, wins, losses], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM foots WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM foots WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, lastname, wins, losses } = req.body;
    const sqlUpdate = "UPDATE foots SET name  = ?, lastname = ?, wins = ?, losses = ?  WHERE id = ?";
    db.query(sqlUpdate, [name, lastname, wins, losses, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    /*const sqlInsert = "INSERT INTO foots (name, lastname, nickname, age, contacts, wins, losses) VALUES ('abalo', 'amavi', 'tassi', 23, 44566677, 45, 10)"
    db.query(sqlInsert, (error, result)=>{
    	console.log("error", error);
    	console.log("result",result);
    	res.send ("Hello Express");
    });*/

});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})