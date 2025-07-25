import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CreateTodo } from '../../models/todo/todo-create';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {

  @Output() todoAdded = new EventEmitter<void>();

  content: string = '';
  is_done: boolean = false;

  isContentNullValid: boolean = false;
  isContentCharValid: boolean = false;
  isSubmitted: boolean = false;

  constructor(private todoService: TodoService) { }

  onContentChange(value: string) {

    this.content = value;
    this.isContentNullValid = this.validateNullContent(value);
    this.isContentCharValid = this.validateCharContent(value);
  }

  validateNullContent(value: string): boolean {

    return value.trim().length > 0;
  }

  validateCharContent(value: string): boolean {
    return value.length <= 100;
  }

  addTodo() {

    this.isSubmitted = true;

    if (!this.isContentNullValid || !this.isContentCharValid) return;

    const trimmed = this.content.trim();

    const newTodo: CreateTodo = {
      content: trimmed,
      is_done: this.is_done
    };

    this.todoService.addTodo(newTodo).subscribe({
      next: () => {
        this.content = '';
        this.is_done = false;
        this.isContentNullValid = false;
        this.isContentCharValid = false;
        this.isSubmitted = false;
        this.todoAdded.emit();
      },
      error: (err) => {
        alert('Error: ' + (err.error.message));
      }
    });
  }
}

