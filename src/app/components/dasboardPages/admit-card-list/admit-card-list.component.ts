import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';

@Component({
  selector: 'app-admit-card-list',
  templateUrl: './admit-card-list.component.html',
  styleUrls: ['./admit-card-list.component.css']
})
export class AdmitCardListComponent implements OnInit {

  constructor(
    private service:ApiService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal

  ) { }

  form:any = FormGroup;
  academicTermData:any = [];
  programTermData:any=[];
  admitCardListData:any = [];
  closeResult: any;
  studentVerifyingData:any;
 


  ngOnInit(): void {
    this.getAllAcedminTerm();
    this.getAllProgramTerm();

    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      progTerm: ['', Validators.required],
      Term: ['', Validators.required]
    });
    
  }

  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      this.academicTermData = res;
    });
  }

  getAllProgramTerm(){
    this.service.getAllProgramTermList().subscribe((res)=>{
      this.programTermData = res;
    })
  }

  getInstituteAdmitCardListDetail(){
     
    this.service.getInstituteAdmitCardListDetails(
      {
      academicTerm:this.form.value.acedTerm,    
      instituteId:localStorage.getItem('instId'),
      programId:this.form.value.progTerm,
      term:this.form.value.Term,
      }
    ).subscribe((res) =>{
       this.admitCardListData=res;
    },(error) => {
      const errorMsg= "Record Not Found !!";
      const modalRef = this.modalService.open(PopupMessageComponent);
      modalRef.componentInstance.message = errorMsg;
   });
  }


  downloadingAdmitCard(data:any){
    this.service.downloadAdmitCard({
      rollNumber: data.rollNumber
    }
    ).subscribe((data)=>{
      const fileName = localStorage.getItem('rollnumber')+ '.pdf'; 
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    },(error) => {
      alert('Something Went Wrong...');
    });
  }


    VerifyStudentByInstitute(){
      const data = this.studentVerifyingData.rollNumber;
      this.service.verifyStudentByInstitute({
      rollNumber: data
    })
  .subscribe((data)=>{
    this.getInstituteAdmitCardListDetail();
  },(error) => {
    this.getInstituteAdmitCardListDetail();
  })
  }


  downloadExaminationFormReport(){
    const instId: number = localStorage.getItem('instId') !== null ? parseInt(localStorage.getItem('instId')!, 0) : 0;
    this.service.downloadExaminationFormVerificationReport({
      atr:this.form.value.acedTerm,
      term:String(this.form.value.Term),
      inst:instId,
      prog:parseInt(this.form.value.progTerm),
     }).subscribe((data:any)=>{
      const fileName = 'ExaminationFormVerificationReport.pdf'; 
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
     })
  }


  open(content: any,data:any) {
     this.studentVerifyingData=data;
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

  
}



