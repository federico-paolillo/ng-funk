import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { isTodoItemComplete, isTodoItemSoftDeleted, isTodoItemTodo, TodoId, TodoItem } from 'src/app/models/todo-item';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'funk-todo-overview',
  templateUrl: './todo-overview.component.html'
})
export class TodoOverviewComponent implements OnInit {

  completeTodos$?: Observable<TodoItem[]>;
  todoTodos$?: Observable<TodoItem[]>;
  deletedTodos$?: Observable<TodoItem[]>;

  constructor(private readonly todosService: TodosService) {
  }

  ngOnInit(): void {
    this.completeTodos$ = this.todosService.todos$.pipe(
      map(todos => todos.filter(isTodoItemComplete))
    );

    this.todoTodos$ = this.todosService.todos$.pipe(
      map(todos => todos.filter(isTodoItemTodo))
    );

    this.deletedTodos$ = this.todosService.todos$.pipe(
      map(todos => todos.filter(isTodoItemSoftDeleted))
    );
  }

  onNewTodo(todoContent: string) {
    this.todosService.new(todoContent);
  }

  onCompleteTodoItem(todoId: TodoId) {
    this.todosService.complete(todoId);
  }

  onDeleteTodoItem(todoId: TodoId) {
    this.todosService.delete(todoId);
  }

  onReallyDeleteTodoItem(todoId: TodoId) {
    this.todosService.reallyDelete(todoId);
  }

  onRecoverTodoItem(todoId: TodoId) {
    this.todosService.recover(todoId);
  }
}
