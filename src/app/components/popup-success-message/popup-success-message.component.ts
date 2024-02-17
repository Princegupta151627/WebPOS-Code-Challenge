import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-success-message',
  templateUrl: './popup-success-message.component.html',
  styleUrls: ['./popup-success-message.component.css']
})
export class PopupSuccessMessageComponent {

  @Input()
  message!: string;

  constructor(public activeModal: NgbActiveModal) {}

  closePopup() {
    this.activeModal.close('Close button clicked');
  }
  

}
