import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './add-user-table-rotuing.module';
import { addUserTableComponent } from './add-user-table.component';
import { AddUserModalComponent } from './ui/add-user-modal/add-user-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [addUserTableComponent, AddUserModalComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddUserTableModule {}
