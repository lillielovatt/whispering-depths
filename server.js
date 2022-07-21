// Create an API using express and mysql2 that will be able to POST a note 
// to a local DB and GET all notes from a local DB. Each note 
// should have a title, body, and author. You can test your API with Insomnia.

//  Bonus: create a html front end where users can See all notes and Post a new one.

const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '$Q2Gd$ye9D22dRp#',
        database: 'unicorn_notes'
    },
    console.log("Connected to database unicorn_notes.")
);

app.get("/api/notes", (req, res) => {
    const sql = "SELECT * FROM notes";

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/homepage.html"));
});

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname, "/public/homepage.html"));
// });

app.post("/api/notes", (req, res) => {
    const { body } = req;
    // const body = req.body
    const sql = `INSERT INTO notes(author, body, title)
    VALUES (?,?,?);`;
    const params = [body.author, body.body, body.title];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: body
        });
    })
});

// need a delete 

app.listen(PORT, () => {
    console.log("Now listening at port.");
})