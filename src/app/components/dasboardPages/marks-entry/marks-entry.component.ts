import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';
import { PopupMessageForButtonsComponent } from '../../popup-message-for-buttons/popup-message-for-buttons.component';
import { PopupSuccessMessageComponent } from '../../popup-success-message/popup-success-message.component';

@Component({
  selector: 'app-marks-entry',
  templateUrl: './marks-entry.component.html',
  styleUrls: ['./marks-entry.component.css']
})
export class MarksEntryComponent implements OnInit {


  constructor(  
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private service:ApiService,
  ) { }
  

  academicTermData:any = [];
  programTermData:any=[];
  getExamTypeNames:any;
  instituteList:any=[];
  form:any = FormGroup;
  showBulkRecordData: any;
  formOpr1:any = FormGroup;
  formOpr2:any = FormGroup;
  formOpr3:any = FormGroup;
  formCompiler:any = FormGroup;
  showDetailsForOperator1:any=[];
  showDetailsForOperator2:any=[];
  showDetailsForCompiler:any=[];
  selectedRowsData: any[] = [];
  showCompilerRecordData:any;
  showEtriesByOperators:any;
  addMarksByOperatorData:any;

  

  closeResult: any;
  closeResult2: any;
  searchForm:any= UntypedFormGroup;
  myForm:any= UntypedFormGroup;
  error:any;
  myNumber!: number;



  action:any;
  taskId:any;
  opr1Fin:any;
  opr2Fin:any;
  oprFin:any;
  subject!: string;
  maxmarks!:number
  minmarks=0;
  searchProg:any = "";
  myControl = new FormControl('');


  ngOnInit(): void {

    this.getAllAcedminTerm();
    this.getAllProgramTerm();
    this.getAllExamTypeName();
    this.getAllinstitute();
    // this.showBulkRecords();


    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      term: ['', [Validators.required]],
      progTerm: ['', ],
      examType: ['', [Validators.required]],
      institute: ['', ],
      searchOption: ['', [Validators.required]]
    });



    this.formOpr1 = this.fb.group({
      bulkMarkEntryObjects: this.fb.array([
        this.fb.group({
          roll_Number: '',
          student_name: '',
          absent: false,
          marks: 0, 
        })
      ]) , 
    });


    this.formOpr2 = this.fb.group({
      bulkMarkEntryObjects: this.fb.array([
        this.fb.group({
          roll_Number: '',
          student_name: '',
          absent: false,
          marks: 0, 
     })
      ]) , 
    });




    this.formOpr3 = this.fb.group({
      bulkMarkEntryObjects: this.fb.array([
        this.fb.group({
          roll_Number: '',
          student_name: '',
          absent: false,
          marks: 0, 
        })
      ]) , 
    });

  }
  
  preventPlusMinus(event: KeyboardEvent): void {
    if (event.key === '+' || event.key === '-') {
      // Prevent the default action of the key press
      event.preventDefault();
    }
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
  openOption(opt2: any) {
    this.modalService.open(opt2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
    });
  }

  private getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  open3(content3: any) {
    
    this.modalService.open(content3,  {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason3(reason)}`;
    });
  }

  private getDismissReason3(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      this.academicTermData = res;
    });
  }
  


  getAllProgramTerm(){
    this.service.getAllProgramTermList().subscribe((res)=>{
      this.programTermData = res;
      console.log(res);

    })
    console.log(this.programTermData);
  }



  getAllExamTypeName(){
    this.service.getExamTypeName().subscribe((res)=>{
      this.getExamTypeNames = res;
    })
    console.log("this.getExamTypeNames "+JSON.stringify(this.getExamTypeNames ));
  }



  getAllinstitute(){
    this.service.getAllInstitute().subscribe((res)=>{
    this.instituteList = res;
    })
  }

  
  showBulkRecords() {
    console.log(this.form.value);
    console.log(this.form.value.term);
   // const selectedOption = this.programTermData.find((option: { programTerm: any; }) => option.programTerm === this.myControl.value);
   // this.form.value.progTerm = selectedOption.programTermId;
    this.service.showBulkRecord(
    { 
      // searchOption:this.form.value.searchOption,
      // acedmmicTerm:this.form.value.acedTerm,
      // progTerm:this.form.value.term,
      // exampType:this.form.value.examType,
      // programId:this.form.value.progTerm,
      // instituteId:localStorage.getItem('instId'),
    //  instituteId:this.form.value.institute,
      acedmmicTerm
      : 
      "2023 (EVEN)",
      exampType
      : 
      "Theory Teacher's Assessment",
      instituteId
      : localStorage.getItem('instId'),
     
      progTerm
      : 
      "4",
      programId
      : 
      "",
      searchOption
      : 
      "ALL"
    }
   ).subscribe((res)=>{
    this.showBulkRecordData=res;
  },(error) => {
    this.showBulkRecordData=null;
    if(this.form.value.searchOption.trim() !== "" && this.form.value.acedTerm.trim() !== "" && this.form.value.term !== '' && this.form.value.examType !== ''){
      const errorMsg= "Record Not Found !!";
      const modalRef = this.modalService.open(PopupMessageComponent);
      modalRef.componentInstance.message = errorMsg;
    }
  });
  
  }


   


   operator1ButtonClick(data:any,operator: string) {
      this.action= operator;
      this.taskId= data.task_id;
      this.opr1Fin= data.opr1;
      this.opr2Fin= data.opr2;
      this.oprFin= data.opr2;
      this.subject=data.subject;
      this.maxmarks=data.maxMarks;
    this.service.operator1Click(
     { 
       action: operator,
       taskId: data.task_id,
       opr1Fin: data.opr1,
       opr2Fin: data.opr2,
       oprFin: data.opr2
     }
    ).subscribe((res)=>{
     this.showDetailsForOperator1=res.entryRes;
    //  this.showDetailsForOperator1.forEach((item: any) => {
    //   if(item.opr1_marks === 0){
    //     item.opr1_marks=null;
    //   }
    //   });
    this.showDetailsForOperator1.forEach((item:any) => {
      item.opr1_marks = item.opr1_marks === 0 ? null : item.opr1_marks;
    });
    
   });
   }



   operator2ButtonClick(data:any,operator: string) {
    this.action= operator;
    this.taskId= data.task_id;
    this.opr1Fin= data.opr1;
    this.opr2Fin= data.opr2;
    this.oprFin= data.opr2;
    this.subject=data.subject;
    this.maxmarks=data.maxMarks;
  this.service.operator2Click(
   { 
     action: operator,
     taskId: data.task_id,
     opr1Fin: data.opr1,
     opr2Fin: data.opr2,
     oprFin: data.opr2
   }
  ).subscribe((res)=>{
   this.showDetailsForOperator2=res.entryRes;
   this.showDetailsForOperator2.forEach((item:any) => {
    item.opr2_marks = item.opr2_marks === 0 ? null : item.opr2_marks;
  });
 });
 }


 addMarksByOperator1() {
  let data: any = {
    action: this.action,
    taskId: this.taskId,
    opr1Fin: this.opr1Fin,
    opr2Fin: this.opr2Fin,
    oprFin: this.oprFin,
    bulkMarkEntryObjects: []
  };
  for (let i = 0; i < this.showDetailsForOperator1.length; i++) {
    console.log("showDetailsForOperator1"+this.showDetailsForOperator1);
      data.bulkMarkEntryObjects.push({
      // absent: this.showDetailsForOperator1[i].absent || false,
      absent: this.showDetailsForOperator1[i].opr1_status || false,
      marks: this.showDetailsForOperator1[i].opr1_marks || '',
      roll_number: this.showDetailsForOperator1[i].roll_Number,
      student_name: this.showDetailsForOperator1[i].student_name
    }); 
  }
  this.addMarksByOperatorData=data.bulkMarkEntryObjects;
  this.service.enterBulkMarksByOperator(
    { 
      action: data.action,
      taskId: data.taskId,
      opr1Fin: data.opr1Fin,
      opr2Fin: data.opr2Fin,
      oprFin: data.oprFin,
      bulkMarkEntryObjects: data.bulkMarkEntryObjects
    }
   ).subscribe((res)=>{
     this.showBulkRecords();
  },(error) => {
    if(error.status == 200){
      this.saveMarksPopup("Marks Saved Successfully !! ");
    }
  });
}





saveMarksPopup(message:string){
    const msg= message;
    const modalRef = this.modalService.open(PopupSuccessMessageComponent);
    modalRef.componentInstance.message = msg;
}

   addMarksByOperator2() {
    console.log("Form data submitted");
    let data: any = {
      action: this.action,
      taskId: this.taskId,
      opr1Fin: this.opr1Fin,
      opr2Fin: this.opr2Fin,
      oprFin: this.oprFin,
      bulkMarkEntryObjects: []
    };
    for (let i = 0; i < this.showDetailsForOperator2.length; i++) {
      data.bulkMarkEntryObjects.push({
        // absent: this.showDetailsForOperator2[i].absent || false,
        absent: this.showDetailsForOperator2[i].opr2_status || false,
        marks: this.showDetailsForOperator2[i].opr2_marks || '',
        roll_number: this.showDetailsForOperator2[i].roll_Number,
        student_name: this.showDetailsForOperator2[i].student_name
      }); 
    }
    this.addMarksByOperatorData=data.bulkMarkEntryObjects;
    this.service.enterBulkMarksByOperator(
      { 
        action: data.action,
        taskId: data.taskId,
        opr1Fin: data.opr1Fin,
        opr2Fin: data.opr2Fin,
        oprFin: data.oprFin,
        bulkMarkEntryObjects: data.bulkMarkEntryObjects
      }
     ).subscribe((res)=>{
       this.saveMarksPopup("Marks Saved Successfully !! ");
      this.showBulkRecords();
      
    },(error) => {
      if(error.status == 200){
        this.saveMarksPopup("Marks Saved Successfully !! ");
      }
      // this.showBulkRecords();
    });
  }



  viewEtriesByOperators(data:any,oprator:string){
    this.taskId= data.task_id;
    this.opr1Fin= data.opr1;
    this.opr2Fin= data.opr2;
    this.oprFin= data.opr2;
    this.subject=data.subject;
    this.maxmarks=data.maxMarks;
    this.service.viewEtriesByOperator(
      {
        action: oprator,
        taskId: this.taskId,
        opr1Fin: this.opr1Fin,
        opr2Fin: this.opr2Fin,
        oprFin: this.oprFin
      }
    ).subscribe((res)=>{
      this.showEtriesByOperators=res.entryRes;
      console.log(JSON.stringify(this.showEtriesByOperators));
    })
  }

  // 
  // this.modalService.dismissAll();
  completeTaskByOperators(operator:string){
      this.service.completeTaskByOperator({
       // bulkMarkEntryObjects:this.addMarksByOperatorData
       action: operator,
       taskId: this.taskId,
       opr1Fin: this.opr1Fin,
       opr2Fin: this.opr2Fin,
       oprFin: this.oprFin,
       bulkMarkEntryObjects:this.addMarksByOperatorData
      }).subscribe((res)=>{
        this.modalService.dismissAll();
        this.showBulkRecords();
        this.saveMarksPopup("Marks Submitted Successfully !! ");

      },(error) => {
         console.log("error");
        // if(error.status === 200){
        //   this.showBulkRecords();
        //   this.modalService.dismissAll();
        // }
        // else{
        //   this.saveMarksPopup(error.error);
        // }
        this.saveMarksPopup(error.error);
       });
  }


destroyShowCompilerRecordData(){
  this.showCompilerRecordData=null;
 this.showCompilerRecordData=null;
}

buttonBorderColor: string = 'initial';

  
  compilerClick(data:any){
       this.action= 'Compiler',
       this.taskId= data.task_id;
       this.opr1Fin= data.opr1;
       this.opr2Fin= data.opr2;
       this.oprFin= data.compiler;
       this.subject=data.subject;
       this.maxmarks=data.maxMarks;
    this.service.compilerClick({
      action: "Compiler",
      taskId:  data.task_id,
      opr1Fin: data.opr1,
      opr2Fin: data.opr2,
      oprFin: data.compiler
    }).subscribe((res)=>{
      this.showCompilerRecordData=res;
      // this.showCompilerRecordData.entryRes.forEach((item:any) => {
      //   item.compiler_Marks = item.compiler_Marks == 0 ? '' : item.compiler_Marks;
      // });
    },(error) => {
      // this.showCompilerRecordData=null;
      // this.showCompilerRecordData=null;
      this.showBulkRecords()
      this.formOpr3.reset();
    });
    }


  
    

   addBulkMarksByCompiler:any;
   addMarksByCompiler() {
    console.log("Form data submitted");
    let data: any = {
      action: this.action,
      taskId: this.taskId,
      opr1Fin: this.opr1Fin,
      opr2Fin: this.opr2Fin,
      oprFin: this.oprFin,
      bulkMarkEntryObjects: []
    };
    for (let i = 0; i < this.showCompilerRecordData.entryRes.length; i++) {
        data.bulkMarkEntryObjects.push({
        absent: this.showCompilerRecordData.entryRes[i].compilerAttendance || false,
        marks: this.showCompilerRecordData.entryRes[i].compiler_Marks || '',
        roll_number: this.showCompilerRecordData.entryRes[i].roll_Number,
        student_name: this.showCompilerRecordData.entryRes[i].student_name,
        remarks: this.showCompilerRecordData.entryRes[i].remarks
      }); 
    }
    this.addBulkMarksByCompiler=data.bulkMarkEntryObjects;
    this.service.enterBulkMarksByCompiler(
      { 
        action: data.action,
        taskId: data.taskId,
        opr1Fin: data.opr1Fin,
        opr2Fin: data.opr2Fin,
        oprFin: data.oprFin,
        bulkMarkEntryObjects: data.bulkMarkEntryObjects
      }
     ).subscribe((res)=>{
      this.saveMarksPopup(" Marks Saved Successfully !! ");
      this.showBulkRecords();
    },(error) => {
      //this.showCompilerRecordData=null;
     // this.showCompilerRecordData.entryRes=null;
      // this.showBulkRecords()
     // this.formOpr3.reset();
    });
  }



  completeTaskByCompiler(){
    // this.addMarksByCompiler();
    this.service.CompleteTaskBulkMarksByCompiler({
      action: 'Compiler',
      taskId: this.taskId,
      opr1Fin: this.opr1Fin,
      opr2Fin: this.opr2Fin,
      oprFin: this.oprFin,
      bulkMarkEntryObjects:this.addBulkMarksByCompiler
    }).subscribe((res)=>{
      console.log("SUBS");
      this.saveMarksPopup(" Marks Submitted Successfully !! ");
      this.showBulkRecords();
    },(error)=>{
      if(error.status == 200){
        this.saveMarksPopup(" Marks Submitted Successfully !! ");
        this.showBulkRecords();
      }
      else{
      console.log("error")
      this.saveMarksPopup(error.error);
    }
    })

  }
   

  



  }
 






  



  