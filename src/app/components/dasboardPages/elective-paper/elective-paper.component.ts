import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl, FormArray, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';
import { PopupMessageForButtonsComponent } from '../../popup-message-for-buttons/popup-message-for-buttons.component';
import { PopupSuccessMessageComponent } from '../../popup-success-message/popup-success-message.component';

@Component({
  selector: 'app-elective-paper',
  templateUrl: './elective-paper.component.html',
  styleUrls: ['./elective-paper.component.css']
})
export class ElectivePaperComponent implements OnInit {

  closeResult: any;
  form:any= UntypedFormGroup;
  electivePapersForm:any= UntypedFormGroup;
   String: any;

  constructor(private service:ApiService,private fb: UntypedFormBuilder, private modalService: NgbModal) { 
    

  }

  totalLength:any;
  page:number = 1;
  readData:any = [];
  getparamid:any;
  programTermData:any=[];
  getAllElectivePaperData:any;
  options = [];
  selectedOptions = new FormControl([]);
  electivePapers: any[] = []; // Replace with your actual data structure
  p: any[] = [];
  pSub: any[] = [];
  s: any[] = [];
  sSub: any[] = [];
  t: any[] = [];
  tSub: any[] = [];
  selectedValues: string[] = [];
  totalNumberOfSelection:number=0;
  selectedElectivePaper:any[]=[];


  ngOnInit(): void {

    this.getAllProgramTerm();


    this.form = this.fb.group({
      type: [null, [Validators.required]],
      semester: [null, [Validators.required]],
      program: [null, [Validators.required]],
    });

    this.selectedValues = new Array(this.getAllElectivePaperData.length);
    this.electivePapersForm = this.fb.group({
      papers: this.fb.array([])
    });
   
  }


 getAllProgramTerm(){
  this.service.getAllProgramTermList().subscribe((res)=>{
    console.log(res);
    this.programTermData = res;
  })
}
get papers() {
    return this.electivePapersForm.get('papers') as FormArray;
  }
  
getAllElectivePaperList(){
  this.getSelectedPaperList();
  this.service.getElectivePaperList(
  {
    syllabus: this.form.value.type,
    term: this.form.value.semester,
    programId: this.form.value.program
  }
  ).subscribe((res)=>{
      this.getAllElectivePaperData=res;
      this.totalNumberOfSelection =this.getAllElectivePaperData.serialNumber;
      this.p = [];
      this.s=[];
      this.t=[];
  },(error)=>{
    if(this.form.value.type != null && this.form.value.term != '' && this.form.value.program != null){
    const errorMsg= "Record Not Found !!";
    const modalRef = this.modalService.open(PopupMessageComponent);
    modalRef.componentInstance.message = errorMsg;
    this.getAllElectivePaperData=null;
  }
  })
}


selectPapers() {
  console.log('p'+JSON.stringify(this.p));
  console.log('s'+JSON.stringify(this.s));
  console.log('t'+JSON.stringify(this.t));
  this.electivePapersForm.papers = this.selectedValues;
  console.log(this.electivePapersForm.papers);
  console.log('Selected Values:', this.selectedValues);

}



totalSelected=0;

selectedSubjectList(code:string,type:string,index:number,name:string){
  const codePrefix = code.substring(0, 7);
  if(type =='P'){
    if(this.p.some(item => item.startsWith(codePrefix)) == false){
        this.p.push(code);
        this.pSub.push(name);
        this.totalSelected++;
    }
    else{
      this.p = this.p.filter(item => !item.startsWith(codePrefix));
        this.p.push(code);
        this.pSub.push(name);
        this.totalSelected++;
    }
  }


  else if(type =='S'){
    if(this.s.some(item => item.startsWith(codePrefix)) == false){
        this.s.push(code);
        this.sSub.push(name);
        this.totalSelected++;
    }
    else{
      this.s = this.s.filter(item => !item.startsWith(codePrefix));
      this.s.push(code);
      this.sSub.push(name);
      this.totalSelected++;
    }
  }

  else if(type =='T'){
        if(this.t.some(item => item.startsWith(codePrefix)) == false){
        this.t.push(code);
        this.tSub.push(name);
        this.totalSelected++;
      }
      else{
        this.t = this.t.filter(item => !item.startsWith(codePrefix));
       this.t.push(code);
       this.tSub.push(name);
       this.totalSelected++;
      }
  }
}



saveElectivePaper(){
  this.service.saveElectivePaperList({
    term:this.form.value.semester,
    syllabus:this.form.value.type,
    programId:this.form.value.program,
    instituteId:localStorage.getItem('instId'),
    p:this.p,
    s:this.s,
    t:this.t,
    psubname:this.pSub,
    ssubname:this.sSub,
    tsubname:this.tSub,
  }).subscribe((res)=>{
    const successMsg= "Elective Paper Saved Successfully !!";
    const modalRef = this.modalService.open(PopupSuccessMessageComponent);
    modalRef.componentInstance.message = successMsg;
  },(error)=>{
    if(error.status === 406){
      const errorMsg= "First Select Your Elective Paper.";
      const modalRef = this.modalService.open(PopupMessageComponent);
       modalRef.componentInstance.message = errorMsg;
    }
    else{
    const errorMsg= error.error;
    const modalRef = this.modalService.open(PopupMessageComponent);
    modalRef.componentInstance.message = errorMsg;
  }
  })
}

getSelectedPaperList(){
  this.service.getSelectedElectivePaperList({
    instId:localStorage.getItem('instId'),
    syllabus: this.form.value.type,
    term: this.form.value.semester,
    programId: this.form.value.program
  }).subscribe((res)=>{
     this.selectedElectivePaper=res;
  })
}

}











