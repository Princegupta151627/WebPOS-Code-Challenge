import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';
import { PopupMessageForButtonsComponent } from '../../popup-message-for-buttons/popup-message-for-buttons.component';
import { PopupSuccessMessageComponent } from '../../popup-success-message/popup-success-message.component';

@Component({
  selector: 'app-edit-marks',
  templateUrl: './edit-marks.component.html',
  styleUrls: ['./edit-marks.component.css']
})
export class EditMarksComponent implements OnInit {
  closeResult: any;
  form:any= UntypedFormGroup;
  form2:any= UntypedFormGroup;
  getEditMarksList:any;
  task_id:number | undefined;
  roll_Number:number | undefined;
  maxmarks:any;
  studentName:string="";
  getid:any;

  constructor(private service:ApiService,private fb: UntypedFormBuilder, 
    private modalService: NgbModal
    ,private router: Router
    ) { }


  
  ngOnInit(): void {
    this.form = this.fb.group({
      roll: [null, [Validators.required]],
    });

    this.form2= this.fb.group({
      removeRemarks: [null, [Validators.required]],
      editedMarks: [null, [Validators.required]],
    });
 
  }

    
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  getinternalEditingMarks(){
    this.service.getinternalEditingMarks(this.form.value.roll)
    .subscribe((res)=>{
        this.getEditMarksList = res;
        if(this.getEditMarksList.length > 0){
        this.maxmarks=this.getEditMarksList[0].maxMarks;
        this.studentName=this.getEditMarksList[0].studentName;
      }
         if(this.getEditMarksList.length === 0){
          const errorMsg= "Record Not Found !!";
          const modalRef = this.modalService.open(PopupMessageComponent);
          modalRef.componentInstance.message = errorMsg;
         }
    },(error) => {
      if(this.form.value.roll != null){
      const errorMsg= "Record not found, enter a valid roll number";
      const modalRef = this.modalService.open(PopupMessageComponent);
      modalRef.componentInstance.message = errorMsg;
    }
    })
  }

  OnEdit(data:any){
   this.task_id=data.task_id;
   }

  EditInternalMarks(){
    this.service.editInternalMarks({
      task_id:this.task_id,
      roll_Number:this.getEditMarksList[0].roll_Number,
      mark:this.form2.value.editedMarks,
      remarks:this.form2.value.removeRemarks
    }).subscribe((res)=>{
      const modalRef = this.modalService.open(PopupSuccessMessageComponent);
      modalRef.componentInstance.message = "Marks Updated Successfully";
      this.getinternalEditingMarks();
      this.form2.reset(); 
    },(error)=>{
      const errorMsg= error.error;
      const modalRef = this.modalService.open(PopupMessageComponent);
      modalRef.componentInstance.message = errorMsg;
      this.form2.reset(); 
    })
  }
   

}

