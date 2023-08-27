import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from 'src/app/features/table/data-access/service/user-service.service';
import { IUser } from 'src/app/features/table/data-access/types/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableData!: IUser[];
  @Input() tableDataHeaders!: string[];
  @Output() toggleButton: EventEmitter<boolean> = new EventEmitter();

  constructor(private userService: UserServiceService) {}

  public trackByUserId(index: number, item: IUser): number | undefined {
    return index && item ? item.id : undefined;
  }

  public toggleValue(event: boolean, id: number | undefined): void {
    this.toggleButton.emit(!event);
    this.userService.updateUsersList(id);
  }
}
