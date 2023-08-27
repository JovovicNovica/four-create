import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserServiceService } from 'src/app/features/table/data-access/service/user-service.service';

export class UniqUserNameValidator {
  static createValidator(userService: UserServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .checkIfUsernameExists(control.value.trim())
        .pipe(
          map((result: boolean) => (result ? { userNameExists: true } : null))
        );
    };
  }
}
