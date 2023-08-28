import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ButtonClassType } from 'src/app/features/table/data-access/types/types';
import { IActionsMap } from '../../types/interfaces/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonClass!: string | ButtonClassType;
  @Input() buttonType!: string;
  @Input() buttonText!: string;
  @Input() forceClose!: boolean;
  @Input() isDisabled!: boolean | 0 | null | undefined;

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  private actionsMap: IActionsMap = {
    openModal: () => {
      this.modalService.modal$.next(true);
    },
    closeModal: () => {
      this.modalService.modal$.next(false);
    },
    onClick: () => {
      this.clicked.emit(true);
      if (this.forceClose) this.actionsMap.closeModal();
    },
  };

  constructor(private modalService: ModalService) {}

  public onClickAction(action: string): void {
    const selectedAction = this.actionsMap[action];
    if (selectedAction) {
      selectedAction();
    }
  }
}
