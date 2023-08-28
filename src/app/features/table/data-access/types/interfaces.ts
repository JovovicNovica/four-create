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
