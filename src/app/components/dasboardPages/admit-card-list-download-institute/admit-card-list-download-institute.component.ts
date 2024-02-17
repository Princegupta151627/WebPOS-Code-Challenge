import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../../popup-message/popup-message.component';

@Component({
  selector: 'app-admit-card-list-download-institute',
  templateUrl: './admit-card-list-download-institute.component.html',
  styleUrls: ['./admit-card-list-download-institute.component.css']
})
export class AdmitCardListDownloadInstituteComponent implements OnInit {

  constructor(
    private service:ApiService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal

  ) { }
  

  form:any = FormGroup;
  centerList:any=[];
  instituteList:any=[];
  academicTermData:any = [];
  instituteId=localStorage.getItem('instId');
  instituteCode=113;

  
  
  ngOnInit(): void {
    this.form = this.fb.group({
      center:['', [Validators.required]],
      acedTerm: ['', [Validators.required]],
      Term: ['', Validators.required]
    });
    
    this.getAllcenter();
    this.getAllinstitute();
    this.getAllAcedminTerm();
  }

  getAllcenter(){
    this.service.getAllCenter().subscribe((res)=>{
    this.centerList = res;
    })
  }

  getAllinstitute(){
    this.service.getAllInstitute().subscribe((res)=>{
    this.instituteList = res;
    })
  }

  getAllAcedminTerm(){
    this.service.acedmicTerm().subscribe((res)=>{
      this.academicTermData = res;
    });
  }



  downloadAdmitCardList(){
     this.service.downloadAdmitCardList({
      pdfFileName:this.findCenterCode()+"_"+this.form.value.acedTerm+"_"+this.instituteCode+"_"+this.form.value.Term+".pdf",
      centerId:this.form.value.center,
      instituteId:localStorage.getItem('instId'),
      academicTerm:this.form.value.acedTerm,
      term:this.form.value.Term
    }
    ).subscribe((data)=>{
      const fileName = this.findCenterCode()+"_"+this.form.value.acedTerm+"_"+this.instituteCode+"_"+this.form.value.Term+'_AdmitCardList'+".pdf";
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    },(error) => {
       const errorMsg= "Record Not Found !!";
       const modalRef = this.modalService.open(PopupMessageComponent);
       modalRef.componentInstance.message = errorMsg;
    });
  }



  findCenterCode():string{
    const selectedCenterId = this.form.value.center;
    const foundCenter = this.centerList.find((center:any) => center.id === selectedCenterId);
     return foundCenter.code;
    }

    findInstituteCode():string{
      const selectedInstituteId = this.form.value.institute;
      const foundInstitute = this.instituteList.find((institute:any) => institute.id === selectedInstituteId);
       return foundInstitute.code;
      }
}

