import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-message-for-buttons',
  templateUrl: './popup-message-for-buttons.component.html',
  styleUrls: ['./popup-message-for-buttons.component.css']
})
export class PopupMessageForButtonsComponent{
  @Input()
  message!: string;

  constructor(public activeModal: NgbActiveModal) {}

  closePopup() {
    this.activeModal.close('Close button clicked');
  }
  

}
