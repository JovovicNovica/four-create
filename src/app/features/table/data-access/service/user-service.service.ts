import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { IUser } from '../types/interfaces';
import { data } from 'src/assets/mock';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private usersListData$ = of(data);
  private destroy$: Subject<void> = new Subject();
  private allUsersActive$: Observable<boolean> | undefined;
  private userCount$: Observable<number> | undefined;

  public isButtonDisabled$: Observable<boolean> = new Observable<boolean>();
  public createButtonDisabled: Subject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  readonly createButtonDisabled$: Observable<boolean> =
    this.createButtonDisabled.pipe(takeUntil(this.destroy$));

  constructor() {
    this.checkConditionForAddButton();
  }

  getUsersList(): Observable<IUser[]> {
    return this.usersListData$.pipe(delay(1000));
  }

  private checkConditionForAddButton(): void {
    this.allUsersActive$ = this.usersListData$.pipe(
      map((users: IUser[]) => users.every((user: IUser) => user.active))
    );

    this.userCount$ = this.usersListData$.pipe(
      map((users: IUser[]) => users.length)
    );

    this.isButtonDisabled$ = combineLatest([
      this.allUsersActive$,
      this.userCount$,
    ]).pipe(map(([allActive, count]) => !allActive || count >= 5));
  }

  public updateUsersList(updatedUserId: number | undefined): void {
    this.usersListData$.subscribe((users: IUser[]) => {
      const userIndex = users.findIndex(
        (user: IUser) => user.id === updatedUserId
      );

      if (userIndex !== -1) {
        users[userIndex].active = !users[userIndex].active;
        this.checkConditionForAddButton();
      }
    });
  }

  public addNewUserToUserList(newUser: IUser): void {
    this.usersListData$.subscribe((users: IUser[]) => {
      users.push({
        id: users.length + 1,
        name: newUser.name,
        active: newUser.active,
      });
      this.checkConditionForAddButton();
    });
  }

  checkIfUsernameExists(value: string): Observable<boolean> {
    return this.usersListData$.pipe(
      delay(1000),
      map((users: IUser[]) =>
        users.some(
          (user: IUser) => user.name.toLowerCase() === value.toLowerCase()
        )
      )
    );
  }

  checkIfCreateButtonIsDisabled(isDisabled: string): void {
    this.usersListData$
      .pipe(
        tap((users: IUser[]) => {
          const test = users.some((user: IUser) => user.name === isDisabled);
          const isButtonDisabled = test || isDisabled === '' ? true : false;
          this.createButtonDisabled.next(isButtonDisabled);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
