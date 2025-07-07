import express from "express";
import { DbTodoRepository } from "../../infrastructure/repository/DbTodoRepository.js";
import { TodoService } from "../../domain/services/TodoService.js"

const router = express.Router();
const todoRepository = new DbTodoRepository();
const todoService = new TodoService(todoRepository);


router.get("/", async (req, res) => {

    try {

        const todos = await todoService.getAllTodos();
        res.json(todos);

    } catch (err) {

        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {

    try {
        const id = Number(req.params.id)
        const todo = await todoService.getTodoById(id);

        res.json(todo);

    } catch (err) {

        if (err.message === "Todo not found") {
            return res.status(404).json({ message: err.message });
        }

        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {

    try {

        const newTodo = await todoService.createTodo(req.body);

        res.status(201).json(newTodo);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const id = Number(req.params.id)
        const updated = await todoService.updateTodo(id, req.body);

        res.json(updated);

    } catch (err) {

        if (err.message === "Todo not found") {

            res.status(404).json({ message: err.message });

        } else {

            res.status(400).json({ message: err.message });

        }
    }
});

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id

        await todoService.deleteTodo(id);
        res.status(204).send();

    } catch (err) {

        if (err.message === "Todo not found") {

            res.status(404).json({ message: err.message });

        } else {

            res.status(500).json({ message: err.message });
        }

    }
});

export default router;
