import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  email: string="";
  password: string="";
  loading = false;
  submitted = false;
  error:any;
 
  constructor(private formBuilder: UntypedFormBuilder,private router: Router,private service: ApiService,private route: ActivatedRoute,
              private modalService: NgbModal       
    ) { }

    formData =  this.formBuilder.group({
      bceceId: ['', Validators.required],
        dob: ['',Validators.required]
        
     });

     ngOnInit() :void{  }

     registration(){
      this.router.navigate(['/validation/registration']);
    }
    generateData:any; 

  onClickSubmit(){
    console.log(
      {
        bceceId:this.formData.value.bceceId,
        dob:this.formData.value.dob,
      }
    )
    this.loading = true;
   

    this.service.validation(
      {
        bceceId:this.formData.value.bceceId,
        dob:this.formData.value.dob,
      }).subscribe((res)=>{ 
       console.log(res,'res==>');
         
       this.generateData = res;

          console.log(this.generateData);
       this.router.navigate(['registration'], {
        queryParams: { generateData: JSON.stringify(this.generateData) },
        relativeTo: this.route
      });
       this.formData.reset();
     }
     ,(error) => {
      this.loading = false;
      // alert(error.error);
      var errmsg=error.error;
      console.log("ERRORMSG="+error.error);
      const modalRef = this.modalService.open(PopupMessageComponent);
        modalRef.componentInstance.message = errmsg;
        this.formData.reset();
      // You can show an error message to the user if needed
     }
     );
    
  }
}
