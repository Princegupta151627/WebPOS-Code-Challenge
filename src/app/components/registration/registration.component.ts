import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, interval, take, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { PopupSuccessMessageComponent } from '../popup-success-message/popup-success-message.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  closeResult: any;

  constructor(
    private service: ApiService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}
  form: any = FormGroup;
  form2: any = UntypedFormGroup;
  form3: any = UntypedFormGroup;

  generateData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.generateData = JSON.parse(params['generateData']);
      console.log(this.generateData);

      // Use the generateData in the second page as needed
    });
    this.form = this.fb.group(
      {
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
        mobile: [null, [Validators.required, Validators.minLength(10)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          this.confirmPasswordValidator('password', 'confirmPassword'),
        ],
      }
    );

    this.form2 = this.fb.group({
      emailotp: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.form3 = this.fb.group({
      mobileotp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  confirmPasswordValidator = (password: string, confirmPassword: string) => {
    return (formGroup: FormGroup) => {
      //storing controlName value in control
      let control = formGroup.controls[password];
      let controlToMatch = formGroup.controls[confirmPassword];

      if (
        controlToMatch.errors &&
        !controlToMatch.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== controlToMatch.value) {
        controlToMatch.setErrors({ confirmPasswordValidator: true }); // if it ll true then it ll show the error
      } else {
        controlToMatch.setErrors(null);
      }
    };
  };
  passwordsMatchValidator(formControl: FormControl) {
    const password = this.form.get('password').value;
    const confirmPassword = formControl.value;

    if (password === confirmPassword) {
      return null; // Passwords match
    } else {
      console.log('error');
      return { passwordsNotMatch: true }; // Passwords do not match
    }
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  open2(content2: any) {
    this.modalService
      .open(content2, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
        }
      );
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

  sendOtpEmail() {
    console.log({
      bceceid: this.generateData.bceceId,
      dob: this.generateData.dob,
      email: this.form.value.email,
    });

    this.service
      .sendOtpToEmail({
        bceceId: this.generateData.bceceId,
        dob: this.generateData.dob,
        email: this.form.value.email,
      })
      .subscribe(
        (res) => {
          console.log(res, 'res==>');
        },
        (error) => {
          alert('invalid OTP');
          console.error('Error:', error);
          // You can show an error message to the user if needed
        }
      );
  }

  isEmailVerified: boolean = false;
  emailOtp() {
    console.log({
      bceceId: this.generateData.bceceId,
      dob: this.generateData.dob,
      emailotp: this.form2.value.emailotp,
    });

    this.service
      .emailVerification({
        bceceId: this.generateData.bceceId,
        dob: this.generateData.dob,
        emailotp: this.form2.value.emailotp,
      })
      .subscribe(
        (res) => {
          console.log(res, 'res==>');
          this.isEmailVerified = true;
        },
        (error) => {
          console.error('Error:', error);
          // You can show an error message to the user if needed
        }
      );
  }

  sendMobileOTP() {
    console.log({
      bceceId: this.generateData.bceceId,
      dob: this.generateData.dob,
      mobile: this.form.value.mobile,
    });

    this.service
      .sendOtpToMobile({
        bceceId: this.generateData.bceceId,
        dob: this.generateData.dob,
        mobile: this.form.value.mobile,
      })
      .subscribe(
        (res) => {
          console.log(res, 'res==>');
        },
        (error) => {
          alert('invalid OTP');
          console.error('Error:', error);
          // You can show an error message to the user if needed
        }
      );
  }

  isMobileNoVerified: boolean = false;
  mobileOtp() {
    console.log({
      bceceId: this.generateData.bceceId,
      dob: this.generateData.dob,
      mobileotp: this.form3.value.mobileOtp,
    });

    this.service
      .mobileVerification({
        bceceId: this.generateData.bceceId,
        dob: this.generateData.dob,
        mobileotp: this.form3.value.mobileotp,
      })
      .subscribe(
        (res) => {
          console.log(res, 'res==>');
          this.isMobileNoVerified = true;
        },
        (error) => {
          alert('something went wrong...');
          console.error('Error:', error);
          // You can show an error message to the user if needed
        }
      );
  }

  login() {
    this.router.navigate(['/login']);
  }

  Registration() {
    console.log({
      bceceId: this.generateData.bceceId,
      dob: this.generateData.dob,
      email: this.form.value.email,
      mobile: this.form.value.mobile,
      password: this.form.value.password,
    });

    this.service
      .registration({
        bceceId: this.generateData.bceceId,
        dob: this.generateData.dob,
        email: this.form.value.email,
        mobile: this.form.value.mobile,
        password: this.form.value.password,
      })
      .subscribe(
        (res) => {
          console.log(res, 'res==>');
          // alert('user registered successfully');
          const modalRef = this.modalService.open(PopupSuccessMessageComponent);
          modalRef.componentInstance.message = "Account created successfully ! Check your Mail we sent your id and password";
          this.login();
        },
        (error) => {
          alert('something went wrong...');
          console.error('Error:', error);
          // You can show an error message to the user if needed
        }
      );
  }

  private destroy$ = new Subject<void>();
  public disableEmailOTPButton = false;
  public resendEmailOTPButton = false;
  public timer = 60;
  buttonText: string = ' ';
  buttonName: string = 'Send OTP';
  emailOTPTimer() {
    //this.userregistrationservice.sendEmailOTP(this.userregistrationform.value)
    this.sendOtpEmail();
    // Disable the button and start the timer
    this.disableEmailOTPButton = true;
    this.buttonText = ` ${this.timer} seconds remaining`;
    interval(1000)
      .pipe(takeUntil(this.destroy$), take(this.timer))
      .subscribe(() => {
        this.timer - 1;
        if (this.timer === 0) {
          this.resendEmailOTPButton = true;
          // Enable the button after 60 seconds
          this.disableEmailOTPButton = false;
          // Reset the timer
          this.timer = 60;
          // Unsubscribe to stop the timer
          this.destroy$.next();
          this.destroy$.complete();
        }
      });
    this.disableEmailOTPButton = true;
    this.buttonText = ` ${this.timer} seconds remaining`;
    const intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.resendEmailOTPButton = true;
        clearInterval(intervalId);
        this.timer = 60;
        this.disableEmailOTPButton = false;
        this.buttonText = ' ';
        this.buttonName = 'Resend OTP ';
      } else {
        this.buttonText = ` ${this.timer} seconds remaining`;
        this.resendEmailOTPButton = false;
      }
    }, 1000);
  }



  //Mobile OTP Sending
  private destroyMobile$ = new Subject<void>();
  public disableMobileOTPButton = false;
  public resendMobileOTPButton = false;
  public mobilOTPtimer = 60;
  mobileOTPbuttonText: string = ' ';
  mobileOTPbuttonName: string = 'Send OTP';
  MobileOTPTimer() {
    this.sendMobileOTP();
    // Disable the button and start the timer
    this.disableMobileOTPButton = true;
    this.mobileOTPbuttonText = ` ${this.timer} seconds remaining`;
    interval(1000)
      .pipe(takeUntil(this.destroy$), take(this.mobilOTPtimer))
      .subscribe(() => {
        this.mobilOTPtimer - 1;
        if (this.mobilOTPtimer === 0) {
          this.resendMobileOTPButton = true;
          // Enable the button after 60 seconds
          this.disableMobileOTPButton = false;
          // Reset the timer
          this.mobilOTPtimer = 60;
          // Unsubscribe to stop the timer
          this.destroy$.next();
          this.destroy$.complete();
        }
      });
    this.disableMobileOTPButton = true;
    this.mobileOTPbuttonText = `Resend OTP in ${this.mobilOTPtimer} seconds`;
    const intervalId = setInterval(() => {
      this.mobilOTPtimer--;
      if (this.mobilOTPtimer === 0) {
        this.resendMobileOTPButton = true;
        clearInterval(intervalId);
        this.mobilOTPtimer = 60;
        this.disableMobileOTPButton = false;
        this.mobileOTPbuttonText = ' ';
        this.mobileOTPbuttonName = 'Resend OTP ';
      } else {
        this.mobileOTPbuttonText = `Resend OTP in ${this.mobilOTPtimer} seconds`;
        this.resendMobileOTPButton=false;
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyMobile$.next();
    this.destroyMobile$.complete();
  }
  
}
