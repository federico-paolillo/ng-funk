import { Injectable } from "@angular/core";
import { faker } from "@faker-js/faker";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoId, TodoItem } from "../models/todo-item";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    readonly #todosSubject: BehaviorSubject<TodoItem[]>;

    #todos: TodoItem[] = [];

    readonly #todos$: Observable<TodoItem[]>;

    get todos$() {
        return this.#todos$;
    }

    constructor() {
        this.#todos = this.#generateTodos(environment.initialTodos);
        this.#todosSubject = new BehaviorSubject<TodoItem[]>(this.#todos);
        this.#todos$ = this.#todosSubject.asObservable();
    }

    complete(todoId: TodoId) {
        const newTodos: TodoItem[] = this.#todos
            .map(todo => {
                if (todo.id !== todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    status: 'done'
                }
            });

        this.#updateTodos(newTodos);
    }

    delete(todoId: string) {
        const newTodos: TodoItem[] = this.#todos
            .map(todo => {
                if (todo.id !== todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    status: 'soft-delete'
                }
            });

        this.#updateTodos(newTodos);
    }

    reallyDelete(todoId: string) {
        const newTodos: TodoItem[] = this.#todos
            .filter(todo => todo.id !== todoId);

        this.#updateTodos(newTodos);
    }

    recover(todoId: string) {
        const newTodos: TodoItem[] = this.#todos
            .map(todo => {
                if (todo.id !== todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    status: 'todo'
                }
            });

        this.#updateTodos(newTodos);
    }

    new(todoContent: string) {
        const newTodo: TodoItem = {
            id: faker.datatype.uuid(),
            content: todoContent,
            status: 'todo'
        };

        const newTodos: TodoItem[] = [newTodo, ...this.#todos];

        this.#updateTodos(newTodos);
    }

    #updateTodos(newTodos: TodoItem[]) {
        this.#todos = newTodos;
        this.#todosSubject.next(this.#todos);
    }

    #generateTodos(count: number): TodoItem[] {
        const generatedTodos: TodoItem[] = [];

        for (let i = 0; i < count; i++) {
            const generatedTodo: TodoItem = {
                id: faker.datatype.uuid(),
                content: faker.hacker.phrase(),
                status: faker.helpers.arrayElement(['done', 'todo', 'soft-delete'])
            };

            generatedTodos.push(generatedTodo);
        }

        return generatedTodos;
    }

}