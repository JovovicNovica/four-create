import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonTitles, TableTitles } from './data-access/types/enums';
import {
  ADD_USERS_TABLE_HEADER,
  BUTTON_CLASSES,
  BUTTON_TYPE,
} from './data-access/types/constants';
import {
  ButtonClassType,
  ButtonTitlesType,
  ButtoneOptionType,
  TableTitlesType,
} from './data-access/types/types';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserServiceService } from './data-access/service/user-service.service';
import { IUser } from './data-access/types/interfaces';
import { Observable } from 'rxjs';
import { UsersQuery } from 'src/app/features/table/data-access/state/users.query';
import { UserServiceFacade } from 'src/app/features/table/data-access/state/user.facade';
import { AddUserModalComponent } from './ui/add-user-modal/add-user-modal.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  standalone: true,
  imports: [
    AddUserModalComponent,
    CommonModule,
    ButtonComponent,
    ToggleButtonComponent,
    TableComponent,
  ],
  selector: 'app-add-user-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-user-table.component.html',
  styleUrls: ['./add-user-table.component.scss'],
})
export class addUserTableComponent {
  public buttonClass: ButtonClassType = BUTTON_CLASSES;
  public buttoneOptionType: ButtoneOptionType = BUTTON_TYPE;
  public addUserButtonTitle: ButtonTitlesType = ButtonTitles.ADD_USERS;
  public tableTitle: TableTitlesType = TableTitles.ADD_USERS_TABLE_TITLE;
  public tableHeaders: Array<string> = ADD_USERS_TABLE_HEADER;
  public listOfUsers$: Observable<IUser[]> =
    this.userServiceFacade.listOfUsers$;

  constructor(
    public modalService: ModalService,
    public userService: UserServiceService,
    private userServiceFacade: UserServiceFacade,
    private usersQuery: UsersQuery
  ) {}

  newUserAdded(): void {
    this.listOfUsers$ = this.usersQuery.selectAll();
  }

  toggleButton() {
    this.listOfUsers$ = this.usersQuery.selectAll();
  }
}
