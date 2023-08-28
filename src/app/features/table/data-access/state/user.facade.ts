import { Injectable } from '@angular/core';
import { UsersQuery } from './users.query';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { IUser } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserServiceFacade {
  listOfUsers$!: Observable<IUser[]>;
  constructor(
    private usersServiceStore: UsersService,
    private usersQuery: UsersQuery
  ) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.listOfUsers$ = this.usersServiceStore.get();
  }

  dispatchAddNewUser(): void {
    this.listOfUsers$ = this.usersQuery.selectAll();
  }
}
