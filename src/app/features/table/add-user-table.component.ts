import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-user-table',
  templateUrl: './add-user-table.component.html',
  styleUrls: ['./add-user-table.component.scss'],
})
export class addUserTableComponent implements OnInit, OnDestroy {
  public buttonClass: ButtonClassType = BUTTON_CLASSES;
  public buttoneOptionType: ButtoneOptionType = BUTTON_TYPE;
  public addUserButtonTitle: ButtonTitlesType = ButtonTitles.ADD_USERS;
  public tableTitle: TableTitlesType = TableTitles.ADD_USERS_TABLE_TITLE;
  public tableHeaders: Array<string> = ADD_USERS_TABLE_HEADER;
  public users!: IUser[];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public modalService: ModalService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.LoadData();
  }

  private LoadData(): void {
    forkJoin([this.userService.getUsersList()])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.users = response[0];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
