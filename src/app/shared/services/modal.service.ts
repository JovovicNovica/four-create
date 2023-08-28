import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  public modal$: Subject<boolean> = new Subject<boolean>();
}
