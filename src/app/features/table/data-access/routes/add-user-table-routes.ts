import { Route } from '@angular/router';
import { addUserTableComponent } from '../../add-user-table.component';

export const TABLE_ROUTES: Route[] = [
  {
    path: '',
    component: addUserTableComponent,
  },
];
