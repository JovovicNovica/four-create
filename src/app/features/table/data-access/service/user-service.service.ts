import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { IUser } from '../types/interfaces';
import { UsersQuery } from 'src/app/features/table/data-access/state/users.query';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private destroy$: Subject<void> = new Subject();
  private allUsersActive$: Observable<boolean | undefined> | undefined;
  private userCount$: Observable<number | undefined> | undefined;
  public isButtonDisabled$: Observable<boolean | 0 | undefined> =
    new Observable<boolean>();
  public createButtonDisabled: Subject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  readonly createButtonDisabled$: Observable<boolean> =
    this.createButtonDisabled.pipe(takeUntil(this.destroy$));

  constructor(private usersQuery: UsersQuery) {}

  public checkConditionForAddButton(listOfUsers?: IUser[]): void {
    this.allUsersActive$ = of(listOfUsers?.every((user: IUser) => user.active));
    this.userCount$ = of(listOfUsers?.length);

    this.isButtonDisabled$ = combineLatest([
      this.allUsersActive$,
      this.userCount$,
    ]).pipe(map(([allActive, count]) => !allActive || (count && count >= 5)));
  }

  checkIfUsernameExists(value: string): Observable<boolean> {
    return this.usersQuery.selectAll().pipe(
      takeUntil(this.destroy$),
      delay(1000),
      map((users: IUser[]) =>
        users.some(
          (user: IUser) => user.name.toLowerCase() === value.toLowerCase()
        )
      )
    );
  }

  checkIfCreateButtonIsDisabled(name: string, users: IUser[]): void {
    const test = users.some((user: IUser) => user.name === name);
    const isButtonDisabled = test || name === '' ? true : false;
    this.createButtonDisabled.next(isButtonDisabled);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
