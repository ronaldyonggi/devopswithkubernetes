const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

const initDatabase = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL
      );
    `;
    await pool.query(createTableQuery);
    console.log("Table 'todos' is ready.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

let todos = [];

// Return current list of todos
app.get("/todos", async (req, res) => {
  const getTodosQuery = `SELECT * FROM todos;`;
  const result = await pool.query(getTodosQuery);
  const dataRows = result.rows;

  res.send(dataRows);
});

// Adds a new todo to the list
app.post("/todos", async (req, res) => {
  try {
    const newTodo = req.body;
    console.log("Received new todo:", newTodo.content);

    if (newTodo.content.length > 140) {
      console.log("Todo rejected: content exceeds 140 characters.");
      return res.status(400).send("Todo content cannot exceed 140 characters.");
    }
    const insertTodoQuery = `INSERT INTO todos (content) VALUES ($1)`;
    await pool.query(insertTodoQuery, [newTodo.content]);
    res.status(201).send();
  } catch (error) {
    console.error("Erorr adding todo:", error);
    res.status(500).send("Error adding todo");
  }
});

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
