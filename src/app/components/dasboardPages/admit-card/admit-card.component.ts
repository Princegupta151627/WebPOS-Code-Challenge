import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admit-card',
  templateUrl: './admit-card.component.html',
  styleUrls: ['./admit-card.component.css']
})
export class AdmitCardComponent implements OnInit {
 
  studentName:any;
  rollnumber:any;
  admitCardDetails:any = [];

  constructor(
    private service:ApiService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.rollnumber = localStorage.getItem('rollnumber');
    this.studentName = localStorage.getItem('name');

    this.getAdmitCardDetails();

  }

  downloadingAdmitCard(){
    this.service.downloadAdmitCard({
      rollNumber: this.rollnumber
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


  getAdmitCardDetails(){
    this.service.getAdmitCardDetails({
      rollnumber: this.rollnumber
    }
    ).subscribe((res)=>{
     this.admitCardDetails = res;
    },(error) => {
    });
  }
}
