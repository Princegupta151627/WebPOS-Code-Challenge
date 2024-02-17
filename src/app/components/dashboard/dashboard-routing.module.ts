import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ResultComponent } from '../dasboardPages/result/result.component';
import { StudentRegistrationComponent } from '../dasboardPages/student-registration/student-registration.component';
import { SemesterEnrollmentNewComponent } from '../dasboardPages/semester-enrollment-new/semester-enrollment-new.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ExaminationformComponent } from '../dasboardPages/examinationform/examinationform.component';
import { AdmitCardComponent } from '../dasboardPages/admit-card/admit-card.component';
import { MarksEntryComponent } from '../dasboardPages/marks-entry/marks-entry.component';
import { AdmitCardListComponent } from '../dasboardPages/admit-card-list/admit-card-list.component';
import { ExaminersComponent } from '../dasboardPages/examiners/examiners.component';
import { ExternalInstituteComponent } from '../dasboardPages/external-institute/external-institute.component';
import { ExamSchedularInstituteComponent } from '../dasboardPages/exam-schedular-institute/exam-schedular-institute.component';
import { AdmitCardPdfListDownloadComponent } from '../dasboardPages/admit-card-pdf-list-download/admit-card-pdf-list-download.component';
import { AdmitCardListDownloadInstituteComponent } from '../dasboardPages/admit-card-list-download-institute/admit-card-list-download-institute.component';
import { ElectivePaperComponent } from '../dasboardPages/elective-paper/elective-paper.component';
import { DebarredStudentsComponent } from '../dasboardPages/debarred-students/debarred-students.component';
import { TabularReportComponent } from '../dasboardPages/tabular-report/tabular-report.component';
import { EditMarksComponent } from '../dasboardPages/edit-marks/edit-marks.component';
import { ExaminationFormVerificationComponent } from '../dasboardPages/examination-form-verification/examination-form-verification.component';
import { AbsenteeUpdateComponent } from '../dasboardPages/absentee-update/absentee-update.component';
import { AnswerBookletDetailsComponent } from '../dasboardPages/answer-booklet-details/answer-booklet-details.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,  
  //  canActivate: [AuthGuard],

    children: [
      { path: 'result', component: ResultComponent },
      { path: 'studentRegistration', component: StudentRegistrationComponent },
      {
        path: 'semesterEnrollmentNew',
        component: SemesterEnrollmentNewComponent,
      },
      {
        path: 'examForm',
        component: ExaminationformComponent,
      },
      {
        path: 'admitCard',
        component: AdmitCardComponent,
      },
      {
        path: 'marksEntry',
        component: MarksEntryComponent,
      },
      // {
      //   path: 'admitCardList',
      //   component: AdmitCardListComponent,
      // },
      // {
      //   path: 'examinationformverification',
      //   component: AdmitCardListComponent,
      // },
      {
        path: 'examinationformverification',
        component: ExaminationFormVerificationComponent,
      },
      {
        path: 'examiners',
        component: ExaminersComponent,
      },
      {
        path: 'externalInstitute',
        component: ExternalInstituteComponent,
      },
      {
        path: 'examSchedularInstitute',
        component: ExamSchedularInstituteComponent,
      },
      {
        path: 'admitCardListDownload',
        component: AdmitCardPdfListDownloadComponent,
      },
      {
        path: 'admitCardListDownloadInstitute',
        component: AdmitCardListDownloadInstituteComponent,
      },
      {
        path: 'electivePaper',
        component: ElectivePaperComponent,
      },
      {
        path: 'debarredStudent',
        component: DebarredStudentsComponent,
      },
      {
        path: 'tabularReport',
        component: TabularReportComponent,
      },
      {
        path: 'editMarks',
        component: EditMarksComponent,
      },
      {
        path: 'absenteeUpdate',
        component: AbsenteeUpdateComponent,
      },
      {
        path: 'answerBookletDetails',
        component: AnswerBookletDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
