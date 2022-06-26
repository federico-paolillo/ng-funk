import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { canComplete, canDelete, canReallyDelete, canTodo, TodoItem } from "../../models/todo-item";

type TodoItemStyles = {
    'todo-item-content': true;
    'todo-item-todo': boolean;
    'todo-item-complete': boolean;
    'todo-item-deleted': boolean;
}

@Component({
    selector: 'funk-todo-item',
    templateUrl: './todo-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        './todo-item.component.css'
    ]
})
export class TodoItemComponent implements OnChanges {

    @Output() completeTodoItem = new EventEmitter<string>();
    @Output() deleteTodoItem = new EventEmitter<string>();
    @Output() reallyDeleteTodoItem = new EventEmitter<string>();
    @Output() recoverTodoItem = new EventEmitter<string>();

    @Input() todoItem?: TodoItem;

    canDelete: boolean = false;
    canComplete: boolean = false;
    canReallyDelete: boolean = false;
    canTodo: boolean = false;

    todoItemStyles: TodoItemStyles = {
        "todo-item-content": true,
        "todo-item-todo": true,
        "todo-item-deleted": false,
        "todo-item-complete": false,
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["todoItem"]) {
            if (this.todoItem) {
                this.canDelete = canDelete(this.todoItem);
                this.canComplete = canComplete(this.todoItem);
                this.canReallyDelete = canReallyDelete(this.todoItem);
                this.canTodo = canTodo(this.todoItem);
                this.todoItemStyles = {
                    "todo-item-content": true,
                    "todo-item-todo": this.todoItem.status === 'todo',
                    "todo-item-deleted": this.todoItem.status === 'soft-delete',
                    "todo-item-complete": this.todoItem.status === 'done',
                };
            }
        }
    }

}