import { Component, Injector, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})

export class InputComponent implements ControlValueAccessor {
  @Input() inputType!: string;
  @Input() placeholderText!: string;
  private innerValue: any;
  control!: FormControl;

  constructor(private injector: Injector) { }

  get value() {
    return this.innerValue;
  }
  set value(value) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCb(value)
    }
  }

  onChangeCb: (_: any) => void = () => { };
  onTouchedDb: (_: any) => void = () => { };

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedDb = fn;
  }

  ngAfterViewInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) this.control = ngControl.control as FormControl;
  }
}
