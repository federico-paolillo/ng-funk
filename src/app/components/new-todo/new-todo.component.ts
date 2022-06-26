import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'funk-new-todo',
    templateUrl: './new-todo.component.html'
})
export class NewTodoComponent {

    @Output() newTodo = new EventEmitter<string>();

    newTodoForm = this.formBuilder.group({
        'content': ['', Validators.required]
    });

    constructor(private readonly formBuilder: FormBuilder) {
    }

    onNewTodoSubmit() {
        if (this.newTodoForm.invalid) {
            return;
        }

        const { content } = this.newTodoForm.value;

        if (content) {
            this.newTodoForm.reset();
            this.newTodo.emit(content);
        }
    }

}