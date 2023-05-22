import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() inputType!: string;
  @Input() placeholderText!: string;
  @Input() document!: any;
  @Output() valueEmitter: EventEmitter<string> = new EventEmitter<string>();
  inputValue: any;

  emitValue() {
    this.valueEmitter.emit(this.inputValue);
  }
}
