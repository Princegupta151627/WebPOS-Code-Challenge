import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private service:ApiService,
    private fb: UntypedFormBuilder
  ) { }
  form:any = FormGroup;
  readData:any = [];
  readData2:any = [];
  ResponseError:boolean=false;
  noResponseError:boolean=false;


  ngOnInit(): void {
    this.getAllAcedminTerm();
    this.form = this.fb.group({
      acedTerm: ['', [Validators.required]],
      progTerm: ['', Validators.required]

    });
   // this.searchDetails();
  }

  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res;
    });
  }

  searchDetails(){
    this.service.internalMarks(
    {
      acedTerm:this.form.value.acedTerm,
      progTerm:this.form.value.progTerm.toString()
    }).subscribe((res)=>{
      console.log(res,"res==>");
      this.readData2 = res;
      this.noResponseError=true;
      this.ResponseError=false;
    },(error) => {
      console.error('Error:', error);
      // You can show an error message to the user if needed
      this.ResponseError=true;
      this.noResponseError=false;
    }
    );

  }
}


