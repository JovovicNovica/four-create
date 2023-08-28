import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsersStore, UsersState } from './users.store';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  constructor(protected store: UsersStore) {
    super(store);
  }

  selectVisibleTodos$ = this.selectAll();

  getListOfUsers() {
    return this.selectAll().pipe(delay(1500));
  }
}
