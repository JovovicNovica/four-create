import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { delay, take, tap } from 'rxjs/operators';
import { UsersStore } from './users.store';
import { data } from 'src/assets/mock';
import { Observable, of } from 'rxjs';
import { IUser } from '../types/interfaces';
import { UserServiceService } from '../service/user-service.service';
import { UsersQuery } from './users.query';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private usersStore: UsersStore,
    private userService: UserServiceService,
    private usersQuery: UsersQuery
  ) {}

  get(): Observable<IUser[]> {
    return of(data).pipe(
      tap((users: IUser[]) => {
        this.userService.checkConditionForAddButton(users);
        this.usersStore.set(users);
      }),
      delay(1000)
    );
  }

  add(user: IUser) {
    this.usersStore.add(user);
    this.allowAddNewUserButton();
  }

  update(user: Partial<IUser>) {
    this.usersStore.update(user.id, user);
    this.allowAddNewUserButton();
  }

  remove(id: ID) {
    this.usersStore.remove(id);
  }

  public allowAddNewUserButton(): void {
    this.usersQuery
      .selectAll()
      .pipe(take(1))
      .subscribe((users: IUser[]) =>
        this.userService.checkConditionForAddButton(users)
      );
  }
}
