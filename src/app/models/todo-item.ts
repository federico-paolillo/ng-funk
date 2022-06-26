export type TodoStatus = 'done' | 'todo' | 'soft-delete';

export type TodoId = string;

export interface TodoItem {
    id: TodoId;
    content: string;
    status: TodoStatus;
}

export function isTodoItemComplete(todoItem: TodoItem): boolean {
    return todoItem.status === 'done';
}

export function isTodoItemTodo(todoItem: TodoItem): boolean {
    return todoItem.status === 'todo';
}

export function isTodoItemSoftDeleted(todoItem: TodoItem): boolean {
    return todoItem.status === 'soft-delete';
}

export function canDelete(todoItem: TodoItem): boolean {
    return todoItem.status === 'done' || todoItem.status === 'todo';
}

export function canTodo(todoItem: TodoItem): boolean {
    return todoItem.status === 'done' || todoItem.status === 'soft-delete';
}

export function canReallyDelete(todoItem: TodoItem): boolean {
    return todoItem.status === 'soft-delete';
}

export function canComplete(todoItem: TodoItem): boolean {
    return todoItem.status === 'todo';
}