import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  BUTTON_CLASSES,
  BUTTON_TYPE,
  INPUT_NAMES,
  INPUT_PLACEHOLDERS,
} from '../../data-access/types/constants';
import {
  ButtonClassType,
  ButtonTitlesType,
  ButtoneOptionType,
  InputErorrsType,
  InputNamesType,
  InputPlaceHoldersType,
} from '../../data-access/types/types';
import { ButtonTitles, InputErorrs } from '../../data-access/types/enums';
import { User, UserFormData } from '../../data-access/types/interfaces';
import { UserServiceService } from '../../data-access/service/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniqUserNameValidator } from 'src/app/shared/utils/uniq-user-name-validator.util';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  public buttonClass: ButtonClassType = BUTTON_CLASSES;
  public buttoneOptionType: ButtoneOptionType = BUTTON_TYPE;
  public closeButtonTitle: ButtonTitlesType = ButtonTitles.CLOSE;
  public createUserButtonTitle: ButtonTitlesType = ButtonTitles.CREATE_USERS;
  public addUserModalTitle: ButtonTitlesType = ButtonTitles.ADD_USERS;
  public userExists: InputErorrsType = InputErorrs.USER_EXISTS;
  public requiredField: InputErorrsType = InputErorrs.REQUIRED_FIELD;
  public onToggleButton = false;
  public inputNames: InputNamesType = INPUT_NAMES;
  public inputPlaceHolders: InputPlaceHoldersType = INPUT_PLACEHOLDERS;

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder,
    public userService: UserServiceService
  ) {}

  public addUserForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.maxLength(30), Validators.required],
      [UniqUserNameValidator.createValidator(this.userService)],
    ],
  });

  ngOnInit(): void {}

  public inputChange(): void {
    this.addUserForm.valueChanges
      .pipe(
        startWith(this.addUserForm.value),
        debounceTime(500),
        take(1),
        distinctUntilChanged()
      )
      .subscribe((data: UserFormData) =>
        this.userService.checkIfCreateButtonIsDisabled(data['name'])
      );
  }

  public toggleValue(onToggle: boolean): void {
    this.onToggleButton = onToggle;
  }

  public onCreate(allow: boolean): void {
    if (allow) {
      const newUser = new User(
        this.addUserForm.controls.name.value,
        this.onToggleButton
      );
      this.userService.addNewUserToUserList(newUser);
    }
  }
}
