import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/features/table/data-access/types/interfaces';
import { UsersService } from 'src/app/features/table/data-access/state/users.service';
import { NgClass, NgFor } from '@angular/common';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  standalone: true,
  imports: [NgClass, NgFor, ToggleButtonComponent],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableData!: IUser[] | null;
  @Input() tableDataHeaders!: string[];
  @Output() toggleButton: EventEmitter<boolean> = new EventEmitter();

  constructor(private usersServiceStore: UsersService) {}

  public trackByUserId(index: number, user: IUser): number | undefined {
    return index && user ? user.id : undefined;
  }

  public toggleValue(event: boolean, user: IUser): void {
    this.toggleButton.emit(!event);
    this.usersServiceStore.update({
      ...user,
      active: !user.active,
    });
  }
}
