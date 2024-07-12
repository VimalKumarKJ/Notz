import express from "express";
import cors from "cors";
import db from "./db.js";


const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(express.json());

//ROUTES

// Create a note - POST
app.post("/add", async(req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = await db.query("INSERT INTO notes(title, content) VALUES($1, $2) RETURNING *", [title, content]);
        res.json(newNote);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all notes - GET

app.get("/", async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes;");
        res.json(result.rows);
    } catch (err) {
        
    }
});

//Delete a note - DELETE

app.delete("/delete/:id", async(req, res) => {
    try {
        const {id} = req.params;
        await db.query("DELETE FROM notes WHERE id = $1;", [id]);
        res.json("Deleted successfully!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



