import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addUserTableComponent } from './features/table/add-user-table.component';

@Component({
  standalone: true,
  imports: [addUserTableComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
