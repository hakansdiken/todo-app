import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input() todos: Todo[] = [];
  @Output() todoChanged = new EventEmitter<void>();

  backupContents = new Map<number, string>(); //geçici veri. cancel oldugunda içeriği kaybolmaması için.
  editingStates = new Map<number, boolean>();

  editingTodo: Todo | null = null;

  isDeleting: boolean = false;
  deletingTodoId: number | null = null;


  content: string = '';
  isContentValid: boolean = true;

  constructor(private todoService: TodoService) { }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
    });
  }

  handleDelete(id: number) {
    this.deletingTodoId = id;
    this.isDeleting = true;
  }

  confirmDelete() {
    if (this.deletingTodoId !== null) {
      this.todoService.deleteTodo(this.deletingTodoId).subscribe(() => {
        this.isDeleting = false;
        this.deletingTodoId = null;
        this.todoChanged.emit();
      });
    }
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deletingTodoId = null;
  }

  onContentChange(value: string) {
    this.content = value;
    this.isContentValid = this.validateContent(value);
  }

  validateContent(value: string): boolean {
    return value.trim().length > 0 && value.length <= 100;
  }

  startEditing(todo: Todo) {

    this.backupContents.set(todo.id, todo.content)
    this.editingStates.set(todo.id, true);
  }

  saveEdit(todo: Todo) {

    this.todoService.updateTodo(todo).subscribe({

      next: () => {
        this.editingStates.set(todo.id, false)
        this.backupContents.delete(todo.id);
      },
      error: (err) => {

        alert("Error: " + (err.error.message));

        todo.content = this.backupContents.get(todo.id) || todo.content;
        this.editingStates.set(todo.id, true);
      }
    });
  }

  cancelEdit(todo: Todo) {

    this.editingStates.set(todo.id, false);
    todo.content = this.backupContents.get(todo.id) || todo.content;
    this.backupContents.delete(todo.id);
  }

  isEditing(todo: Todo): boolean {

    return this.editingStates.get(todo.id) || false;
  }

  updateTodo() {

    if (!this.editingTodo) return;

    this.todoService.updateTodo(this.editingTodo).subscribe(() => {
      this.editingTodo = null;
      this.todoChanged;
    });
  }

}