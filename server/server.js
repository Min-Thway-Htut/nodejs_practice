const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5002;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todolist")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
    const updatedTodo = await Todo.findByIdAndDelete(req.params.id, req.body, {new: true});
    res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message: "Todo deleted"});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

