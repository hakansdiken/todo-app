import { DbTodoRepository } from "../../infrastructure/repository/DbTodoRepository.js";
import { Todo } from "../entities/Todo.js";

export class TodoService {

  constructor() {
    this.todoRepository = new DbTodoRepository();
  }

  async createTodo(data) {

    if (!data.content) {

      throw new Error("Content is required!")

    } else if (typeof data.content !== "string" || typeof data.is_done !== "boolean") {

      throw new Error("Data is invalid!")

    } else if (data.content.length > 100) {

      throw new Error("Content must be less than 100 characters!");
    }

    const todo = new Todo({
      content: data.content,
      is_done: data.is_done ?? false,
    });

    return await this.todoRepository.save(todo)
  }

  async getAllTodos() {

    return await this.todoRepository.findAll();
  }

  async getTodoById(id) {

    const todo = await this.todoRepository.findById(id);

    if (!todo) {

      throw new Error("Todo not found");
    }

    return todo;
  }

  async updateTodo(id, data) {

    const todo = await this.todoRepository.findById(id);

    if (!todo) {

      throw new Error("Todo not found");

    } else if (!data.content) {

      throw new Error("Content is required!")

    } else if (typeof data.content !== "string") {

      throw new Error("Content has invalid data!")

    } else if (typeof data.is_done !== "boolean") {

      throw new Error("is_Done has invalid data!")

    }
    else if (data.content.length > 100) {

      throw new Error("Content must be less than 100 characters!");
    }

    todo.content = data.content ?? todo.content;
    todo.is_done = data.is_done ?? todo.is_done;
    todo.updated_date = new Date();

    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id) {

    const todo = await this.todoRepository.findById(id);

    if (!todo) {

      throw new Error("Todo not found");
    }

    return await this.todoRepository.delete(id);
  }
}

