const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

let todos = []

// Return current list of todos
app.get('/todos', (req, res) => {
    res.send(todos)
})

// Adds a new todo to the list
app.post('/todos', (req, res) => {
    const newTodo = req.body
    todos.push(newTodo);
    res.status(201).send()
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});