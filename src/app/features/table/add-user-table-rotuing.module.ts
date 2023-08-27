import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { addUserTableComponent } from './add-user-table.component';

const tableRoutingRoutes: Routes = [
  {
    path: '',
    component: addUserTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(tableRoutingRoutes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
