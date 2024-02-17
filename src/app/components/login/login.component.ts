import { Component, OnInit } from '@angular/core';
import {  FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string="";
  password: string="";
  loading = false;
  submitted = false;
  error:any;
  form!: FormGroup;
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private service: ApiService,
    private modalService: NgbModal) { }

    formData =  this.formBuilder.group({
        userid: ['', Validators.required],
        password: ['',Validators.required],

        
     });
     
     ngOnInit() :void{  
     
    }
     registration(){
      this.router.navigate(['/validation']);
    }
    dash(){
      this.router.navigate(['/dashboard/studentRegistration']);
    }
      
  onClickSubmit(){
    this.loading = true;
    console.log({
  userid:this.formData.value.userid,
  password:this.formData.value.password,
});
    this.service.login(
      {
        userid:this.formData.value.userid,
        password:this.formData.value.password,
      }).subscribe((res)=>{
        const token = res.token;
        localStorage.setItem('token', token);

        const name = res.name;
        localStorage.setItem('name', name);

        const roles = res.roles;
        localStorage.setItem('roles', roles);

        const rollnumber = res.rollnumber;
        localStorage.setItem('rollnumber', rollnumber);

        const instId = res.instId;
        localStorage.setItem('instId', instId);
        
        const roleViewMenu=res.roleviewMenu;
        localStorage.setItem('roleViewMenu', roleViewMenu);

        this.dash();

         },(error) => {
        this.loading = false;
        this.error= "Invalid Email or Password";
        
        const modalRef = this.modalService.open(PopupMessageComponent);
        modalRef.componentInstance.message = this.error;
        this.formData.reset();
      });
  }
}
























