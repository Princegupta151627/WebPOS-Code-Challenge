import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';

@Component({
  selector: 'app-debarred-students',
  templateUrl: './debarred-students.component.html',
  styleUrls: ['./debarred-students.component.css']
})
export class DebarredStudentsComponent implements OnInit {

  closeResult: any;
  form:any= UntypedFormGroup;
  form2:any= UntypedFormGroup;

  constructor(private service:ApiService,private fb: UntypedFormBuilder, 
    private modalService: NgbModal
    ,private router: Router
    ) { }

  totalLength:any;
  page:number = 1;
  readData:any = [];
  getparamid:any;
  acedTerm:any;
  term:any;
  academicTermData:any = [];
  studentNameByReg:any;
  debarredStudentDetails:any = [];
  removeRegNo:any


  
  ngOnInit(): void {
    this.getDebarredStudent();
    this.getAllAcedminTerm();

    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      regNo: ['', [Validators.required]],
       name: [''],  
      term: ['', Validators.required],
      dueTo: ['', [Validators.required]],
      otherDueTo: [''],
    });
    this.form.get('dueTo').valueChanges.subscribe((value: string) => {
      if (value === 'If any other') {
        this.form.get('otherDueTo').setValidators([Validators.required]);
      } else {
        this.form.get('otherDueTo').clearValidators();
      }
      this.form.get('otherDueTo').updateValueAndValidity();
    });
    this.form2= this.fb.group({
      removeRemarks: [null, [Validators.required]],
    });

  }

    
  open(content: any) {
    this.studentNameByReg=null;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(content1: any) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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


OnEdit(us:any,form:any){
  this.getparamid = us.id;
  this.form.controls['name'].setValue(us.name);

 }
 

 getAllAcedminTerm(){
  this.service.acedmicTerm().subscribe((res)=>{
    this.academicTermData = res;
  });
  }


  getStudentNameByRegNo(id:string){
    this.service.getStudentNameByRegNo( id ).subscribe((res)=>{
      this.studentNameByReg = res.name;
    },(error) => {
      this.studentNameByReg ="";
     });
  }



  resetform(){
    this.form.reset();
  }


  saveDebarredStudent(form:any) {
    if(this.form.value.dueTo === 'If any other'){
      this.form.value.dueTo = this.form.value.otherDueTo;
    }
    if(this.form.valid){
    this.service.addDebarredStudent(
    {
      academicTerm:this.form.value.acedTerm,
      regNo:this.form.value.regNo,
      term:this.form.value.term,
      dueTo:this.form.value.dueTo,
      instId:localStorage.getItem('instId'),
      studentName:this.studentNameByReg
    }
   ).subscribe((res)=>{
    this.form.reset();
     this.getDebarredStudent();
  },(error) => {
    const errorMsg= error.error;
    const modalRef = this.modalService.open(PopupMessageComponent);
    modalRef.componentInstance.message = errorMsg;
    this.getDebarredStudent();
    this.form.reset();
   });
  } else{
    const errorMsg= "Invalid Form Details";
    const modalRef = this.modalService.open(PopupMessageComponent);
    modalRef.componentInstance.message = errorMsg;
    this.getDebarredStudent();
  }
  }

  getDebarredStudent(){
    this.service.getAllDebarredStudent(
      {
        id:localStorage.getItem('instId')
      }
     ).subscribe((res)=>{
       this.debarredStudentDetails=res;
       this.form2.reset();
       this.form.reset();
    },(error)=>{
      this.form2.reset();
      this.form.reset();
    });
  }

  removeDebarredStudent(form2:any){
    const regNo=this.getparamid;
    this.service.removeDebarredStudent({
      registrationNo:regNo,
      academicTerm:this.acedTerm,
      term:this.term,
      removeRemarks:this.form2.value.removeRemarks
      
    }).subscribe((res)=>{
      this.form2.value.removeRemarks='';
      this.getDebarredStudent();
       this.form.reset();
       
    },(error) => {
      this.getDebarredStudent();
      this.form.reset();
     }
    );
  }


  onRemove(data:any){
    this.getparamid = data.regNo;
    this.acedTerm=data.academicTerm;
     this.term=data.term;
   }

}

