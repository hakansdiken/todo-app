import { Component, OnInit } from "@angular/core";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoInputComponent } from "./components/todo-input/todo-input.component";
import { CommonModule } from "@angular/common";
import { Todo } from "./models/todo/todo";
import { TodoService } from "./services/todo.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoInputComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {

    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });

  }
}