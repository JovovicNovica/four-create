import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IUser } from '../types/interfaces';

export interface UsersState extends EntityState<IUser> {
  id: number;
  username: string;
  active: boolean;
}

export function createInitialState(): UsersState {
  return {
    id: 1,
    username: 'Sophia Garcia',
    active: true,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super();
  }
}
