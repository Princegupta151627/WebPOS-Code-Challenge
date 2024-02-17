import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-examinationform',
  templateUrl: './examinationform.component.html',
  styleUrls: ['./examinationform.component.css']
})
export class ExaminationformComponent implements OnInit {
  constructor(
    private service:ApiService,
    private fb: UntypedFormBuilder,
  ) { }

  form:any = FormGroup;
  readData:any = [];
  readData2:any = [];
  ResponseError:boolean=false;
  noResponseError:boolean=false;

 

  ngOnInit(): void {
    
    this.getAllAcedminTerm();
    this.form = this.fb.group({
      acedTerm: ['', Validators.required],
      progTerm: ['', Validators.required]

    });
  }

  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      this.readData = res;
    });
  }

  searchDetails(){
    this.service.studentExaminationForm(
    {
      acedTerm:this.form.value.acedTerm,
      progTerm:this.form.value.progTerm.toString()
    }).subscribe((res)=>{
      this.readData2 = res;
      this.ResponseError=false;
      this.noResponseError=true;
    }
    ,(error) => {
      this.ResponseError=true;
      this.noResponseError=false;
    });

  }

  examinationFornSubmit(){
    this.service.examinationFornSubmit(
      {
        rollNumber:this.readData2.rollNumber
      }
    ).subscribe((res)=>{
       this.searchDetails();
    },(error) => {
    });
  }

  generateExaminationFormPDF(){
    this.service.downloadExaminationFormPDF({
      academicTerm:this.form.value.acedTerm,
      term:this.form.value.progTerm.toString(),
      studentId:this.readData2.studentId,
      rollnumber:localStorage.getItem('rollnumber')+ '.pdf',
    }
    ).subscribe((data)=>{
      const fileName = localStorage.getItem('rollnumber')+ '.pdf'; 
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    },(error) => {
    });
  }

}

