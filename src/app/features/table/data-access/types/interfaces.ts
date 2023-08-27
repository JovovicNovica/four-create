export interface IButtonClassType {
  add: string;
  close: string;
}

export interface IButtonOption {
  openModal: string;
  closeModal: string;
  onClick: string;
}

export interface IInputNames {
  name: string;
}

export interface IInputPlaceHolders extends IInputNames {}

export interface IUser {
  name: string;
  active: boolean;
  id?: number;
}

export interface UserFormData {
  name: string;
}

export class User implements IUser {
  public name: string;
  public active: boolean;
  public id?: number;

  constructor(name: string, active: boolean, id?: number) {
    this.id = id;
    this.name = name;
    this.active = active;
  }
}
