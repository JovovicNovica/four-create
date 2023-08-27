import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    TableComponent,
    ToggleButtonComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    InputComponent,
    TableComponent,
    ToggleButtonComponent,
  ],
})
export class SharedModule {}
