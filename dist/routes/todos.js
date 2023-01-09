"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = []; // 'todos' array of type 'Todo[]'
const router = (0, express_1.Router)();
/* getting all the todos */
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
/* adding a new todo */
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo); // appending new todo into the 'todos' array!
    res.status(201).json({ message: "New todo added!", todo: newTodo, todos: todos });
});
/* updating a todo */
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    // valid index
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "Updated todo!", todos: todos });
    }
    // invalid index
    res.status(400).json({ message: "Could not find todo for this id!" });
});
/* deleting a todo */
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid); // making a new array without the desired todo
    // invalid index
    res.status(200).json({ message: "Deleted todo", todos: todos });
});
exports.default = router;
