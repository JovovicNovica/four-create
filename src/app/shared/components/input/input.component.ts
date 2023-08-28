import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputErorrsType } from 'src/app/features/table/data-access/types/types';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() parentForm!: FormGroup;
  @Input() inputName!: string;
  @Input() placeHolder!: string;
  @Input() errorValidator!: InputErorrsType;
  @Input() errorRequired!: InputErorrsType;

  @Input() error!: any;

  @Output() readonly inputChange: EventEmitter<string> = new EventEmitter();
  constructor() {}

  onInputChange(e: any): void {
    this.inputChange.emit(e.target.value);
  }
}
