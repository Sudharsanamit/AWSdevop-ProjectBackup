const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CHANGE PASSWORD HERE
const db = mysql.createConnection({
    host: "my-db.cc9e40y8ou5u.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "StrongPassword123",
    database: "feedback_app",
    port: 3306
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

app.post("/feedback", (req, res) => {
    const { name, message } = req.body;

    db.query(
        "INSERT INTO feedback (name, message) VALUES (?, ?)",
        [name, message],
        (err) => {
            if (err) {
                res.send("Error inserting");
            } else {
                res.send("Inserted successfully");
            }
        }
    );
});

app.get("/feedback", (req, res) => {
    db.query("SELECT * FROM feedback", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});