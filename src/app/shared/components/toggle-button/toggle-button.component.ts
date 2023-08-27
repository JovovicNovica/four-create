import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent {
  @Output() readonly toggleValue: EventEmitter<boolean> = new EventEmitter();
  @Input() data!: boolean;
  constructor() {}

  toggleSwitch(event: Event, data: boolean): void {
    event.stopPropagation();
    this.toggleValue.emit(!data);
  }
}
