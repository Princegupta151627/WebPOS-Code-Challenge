import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-absentee-update',
  templateUrl: './absentee-update.component.html',
  styleUrls: ['./absentee-update.component.css']
})
export class AbsenteeUpdateComponent implements OnInit {


  constructor(  
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private service:ApiService,
  ) { }
  

  academicTermData:any = [];
  programTermData:any=[];
  instituteList:any=[];
  form:any = FormGroup;
  

  closeResult: any;
 


  ngOnInit(): void {

    this.getAllAcedminTerm();
    this.getAllProgramTerm();
    this.getAllinstitute();


    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      term: ['', [Validators.required]],
      progTerm: ['', ],
      institute: ['', ],
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
  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      this.academicTermData = res;
    });
  }
  

  getAllProgramTerm(){
    this.service.getAllProgramTermList().subscribe((res)=>{
      this.programTermData = res;
    })
    console.log(this.programTermData);
  }



  


  getAllinstitute(){
    this.service.getAllInstitute().subscribe((res)=>{
    this.instituteList = res;
    })
  }

  
}





  



  