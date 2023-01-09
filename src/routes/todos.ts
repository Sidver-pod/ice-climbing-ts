import { Router } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string } // incoming request's body structure
type RequestParams = { todoId: string }

let todos: Todo[] = []; // 'todos' array of type 'Todo[]'

const router = Router();

/* getting all the todos */
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

/* adding a new todo */
router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;

    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newTodo); // appending new todo into the 'todos' array!

    res.status(201).json({ message: "New todo added!", todo: newTodo, todos: todos });
});

/* updating a todo */
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);

    // valid index
    if(todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };

        return res.status(200).json({ message: "Updated todo!", todos: todos });
    }

    // invalid index
    res.status(400).json({ message: "Could not find todo for this id!" });
});

/* deleting a todo */
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;

    todos = todos.filter(todoItem => todoItem.id !== tid); // making a new array without the desired todo

    // invalid index
    res.status(200).json({ message: "Deleted todo", todos: todos });
});

export default router;