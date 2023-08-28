import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { IUser } from '../../data-access/types/interfaces';
import { UserServiceService } from '../../data-access/service/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniqUserNameValidator } from 'src/app/shared/utils/uniq-user-name-validator.util';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import { UsersService } from 'src/app/features/table/data-access/state/users.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { UsersQuery } from 'src/app/features/table/data-access/state/users.query';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit, OnDestroy {
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
  public userLength!: number;

  private destroy$: Subject<void> = new Subject();

  @Input() allUsers$!: Observable<IUser[]>;
  @Output() newUserAdded: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userServiceStore: UsersService,
    private usersQuery: UsersQuery,
    public modalService: ModalService,
    public userService: UserServiceService
  ) {}

  public addUserForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.maxLength(30), Validators.required],
      [UniqUserNameValidator.createValidator(this.userService)],
    ],
  });

  ngOnInit(): void {
    this.allUsers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: IUser[]) => (this.userLength = users.length));
  }

  public inputChange(): void {
    combineLatest([
      this.addUserForm.valueChanges.pipe(
        startWith(this.addUserForm.value),
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.usersQuery.selectAll(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([formValue, users]) => {
        this.userService.checkIfCreateButtonIsDisabled(
          formValue['name'],
          users
        );
      });
  }

  public toggleValue(onToggle: boolean): void {
    this.onToggleButton = onToggle;
  }

  public onCreate(allow: boolean): void {
    if (allow) {
      const newUser = {
        id: this.userLength + 1,
        name: this.addUserForm.controls.name.value,
        active: this.onToggleButton,
      };
      this.userServiceStore.add(newUser);
      this.newUserAdded.emit();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
