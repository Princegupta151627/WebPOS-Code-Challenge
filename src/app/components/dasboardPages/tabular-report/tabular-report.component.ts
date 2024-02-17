import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tabular-report',
  templateUrl: './tabular-report.component.html',
  styleUrls: ['./tabular-report.component.css']
})
export class TabularReportComponent implements OnInit {

  closeResult: any;
  form:any= UntypedFormGroup;
  constructor(private service:ApiService,private fb: UntypedFormBuilder, private modalService: NgbModal) { }

  totalLength:any;
  page:number = 1;
  readData:any = [];
  
  ngOnInit(): void {
 

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      id: [null, [Validators.required]]

    });

  }

  


}


