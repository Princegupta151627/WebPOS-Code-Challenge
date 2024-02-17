import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router) { }

  roles:any;
  selectedNavItem: string = '';
  roleViewMenu:any;


  ngOnInit(): void {
    
    this.roles = localStorage.getItem('roles');
    this.roleViewMenu= localStorage.getItem('roleViewMenu');
    console.log("sidenav========"+this.roleViewMenu);
  }








  semesterEnrollmentNew(){
    this.router.navigate(['/dashboard/semesterEnrollmentNew']);
  }
  studentRegistarion(){
    this.router.navigate(['/dashboard/studentRegistration']);
  }
  result(){
    this.router.navigate(['/dashboard/result']);
  }
  examForm(){
    this.router.navigate(['/dashboard/examForm']);
  }
  admitCard(){
    this.router.navigate(['/dashboard/admitCard']);
  }
  // marksEntry(){
  //   this.router.navigate(['/dashboard/marksEntry']);
  // }
  admitCardList(){
    this.router.navigate(['/dashboard/admitCardList']);

  }
  examiners(){
    this.router.navigate(['/dashboard/examiners']);

  }
  externalInstitute(){
    this.router.navigate(['/dashboard/externalInstitute']);

  }
  examSchedularInstitute(){
    this.router.navigate(['/dashboard/examSchedularInstitute']);

  }
  // electivePaper(){
  //   this.router.navigate(['/dashboard/electivePaper']);

  // }
  // debarredStudent(){
  //   this.router.navigate(['/dashboard/debarredStudent']);

  // }









//institute
  // admitCardVerifyAndDownloadInstitute(){
  //   this.router.navigate(['/dashboard/admitCardList']);
  // }
  examinationFormVerification(){
    this.selectedNavItem = 'examinationFormVerification';

    this.router.navigate(['/dashboard/examinationformverification']);
  }
  debarredStudent(){
    this.selectedNavItem = 'debarredStudent';

    this.router.navigate(['/dashboard/debarredStudent']);

  }
  admitCardListInstitute(){
    this.selectedNavItem = 'admitCardListInstitute';

    this.router.navigate(['/dashboard/admitCardListDownloadInstitute']);
  }
  marksEntry(){
    this.selectedNavItem = 'marksEntry';

    this.router.navigate(['/dashboard/marksEntry']);
  }
  editMarks(){
    this.selectedNavItem = 'editMarks';

    this.router.navigate(['/dashboard/editMarks']);

  }
  tabularReport(){
    this.selectedNavItem = 'tabularReport';

    this.router.navigate(['/dashboard/tabularReport']);
  }
  electivePaper(){
    this.selectedNavItem = 'electivePaper';
    this.router.navigate(['/dashboard/electivePaper']);
  }


//NOT COMP
  absenteeUpdate(){
    this.selectedNavItem = 'absenteeUpdate';
    this.router.navigate(['/dashboard/absenteeUpdate']); 
  }
    
  answerBookletDetails(){
    this.selectedNavItem = 'answerBookletDetails';
    this.router.navigate(['/dashboard/answerBookletDetails']); 
  }

  examShedularInst(){
    this.selectedNavItem = 'examSchedularInstitute';
    this.router.navigate(['/dashboard/examSchedularInstitute']); 
  }
  examiner(){
    this.selectedNavItem = 'examiners';
    this.router.navigate(['/dashboard/examiners']); 
  }

  externalInst(){
    this.selectedNavItem = 'externalInstitute';
    this.router.navigate(['/dashboard/externalInstitute']); 
  }





  
  //Admin
  admitCardListDownloadAdmin(){
    this.router.navigate(['/dashboard/admitCardListDownload']);
  }



  


}
