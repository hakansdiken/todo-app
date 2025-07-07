import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo/todo';
import { TODOS_ENDPOINT } from '../constants/api';
import { UpdateTodo } from '../models/todo/todo-update';
import { CreateTodo } from '../models/todo/todo-create';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    
    return this.http.get<Todo[]>(TODOS_ENDPOINT);
  }

  addTodo(todo: CreateTodo): Observable<Todo> {

    return this.http.post<Todo>(TODOS_ENDPOINT, todo);
  }

  updateTodo(todo: UpdateTodo): Observable<Todo> {

    return this.http.put<Todo>(`${TODOS_ENDPOINT}/${todo.id}`, todo)
  }

  deleteTodo(id: number): Observable<void> {

    return this.http.delete<void>(`${TODOS_ENDPOINT}/${id}`);
  }
}
