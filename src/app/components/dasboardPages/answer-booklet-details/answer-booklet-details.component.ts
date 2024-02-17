import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-answer-booklet-details',
  templateUrl: './answer-booklet-details.component.html',
  styleUrls: ['./answer-booklet-details.component.css']
})
export class AnswerBookletDetailsComponent implements OnInit {


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
    

    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      examDate: ['', ],
      num: ['', ],
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
  

  
}





  



  
