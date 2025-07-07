import { TodoRepository } from "../../domain/repositories/TodoRepository.js";
import { Todo } from "../../domain/entities/Todo.js";
import pool from "../database.js";

export class DbTodoRepository extends TodoRepository {

    async findById(id) {

        const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);

        if (result.rows.length === 0) {

            return null;

        } else

            return this._mapToEntity(result.rows[0]);

    }

    async findAll() {

        const result = await pool.query("SELECT * FROM todos ORDER BY created_date DESC");

        return result.rows.map(row => this._mapToEntity(row));

    }

    async save(todo) {

        if (!todo.id) {

            const result = await pool.query(
                `INSERT INTO todos (content, is_done, created_date, updated_date) VALUES ($1, $2, $3, $4) RETURNING *`,
                [todo.content, todo.is_done, todo.created_date, todo.updated_date]
            );

            return this._mapToEntity(result.rows[0]);

        } else {
            const result = await pool.query(
                `UPDATE todos SET content = $1, is_done = $2, updated_date = $3 WHERE id = $4 RETURNING *`,
                [todo.content, todo.is_done, todo.updated_date, todo.id]
            );

            return this._mapToEntity(result.rows[0]);

        }
    }

    async delete(id) {

        await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    }

    _mapToEntity(row) {

        return new Todo({
            id: row.id,
            content: row.content,
            is_done: row.is_done,
            created_date: row.created_date,
            updated_date: row.updated_date,
        });
    }
}
