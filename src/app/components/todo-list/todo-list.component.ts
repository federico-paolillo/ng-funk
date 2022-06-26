import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/models/todo-item';

@Component({
  selector: 'funk-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @Input() title: string = '';
  @Input() todoItems: TodoItem[] | null = [];

  @Output() completeTodoItem = new EventEmitter<string>();
  @Output() deleteTodoItem = new EventEmitter<string>();
  @Output() reallyDeleteTodoItem = new EventEmitter<string>();
  @Output() recoverTodoItem = new EventEmitter<string>();

}
