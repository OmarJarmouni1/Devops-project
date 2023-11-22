import express from "express";
import mysql from "mysql2";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "db Password",
    database: "db name"
});

app.use(express.json())
app.use(cors())

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database!");
    }
});

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created!");
    })
})

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"
    
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted!");
    })
})


app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been Updated!");
    })
})


const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
