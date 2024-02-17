import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ValidationComponent } from './components/validation/validation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentRegistrationComponent } from './components/dasboardPages/student-registration/student-registration.component';
import { SemesterEnrollmentNewComponent } from './components/dasboardPages/semester-enrollment-new/semester-enrollment-new.component';
import { ResultComponent } from './components/dasboardPages/result/result.component';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ExaminationformComponent } from './components/dasboardPages/examinationform/examinationform.component';
import { PopupMessageComponent } from './components/popup-message/popup-message.component';
import { AdmitCardComponent } from './components/dasboardPages/admit-card/admit-card.component';
import { MarksEntryComponent } from './components/dasboardPages/marks-entry/marks-entry.component';
import { AdmitCardListComponent } from './components/dasboardPages/admit-card-list/admit-card-list.component';
import { ExaminersComponent } from './components/dasboardPages/examiners/examiners.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ExternalInstituteComponent } from './components/dasboardPages/external-institute/external-institute.component';
import { ExamSchedularInstituteComponent } from './components/dasboardPages/exam-schedular-institute/exam-schedular-institute.component';
import { AdmitCardPdfListDownloadComponent } from './components/dasboardPages/admit-card-pdf-list-download/admit-card-pdf-list-download.component';
import { AdmitCardListDownloadInstituteComponent } from './components/dasboardPages/admit-card-list-download-institute/admit-card-list-download-institute.component';
import { ElectivePaperComponent } from './components/dasboardPages/elective-paper/elective-paper.component';
import { DebarredStudentsComponent } from './components/dasboardPages/debarred-students/debarred-students.component';
import { TabularReportComponent } from './components/dasboardPages/tabular-report/tabular-report.component';
import { EditMarksComponent } from './components/dasboardPages/edit-marks/edit-marks.component';
import { PopupMessageForButtonsComponent } from './components/popup-message-for-buttons/popup-message-for-buttons.component';
import { ExaminationFormVerificationComponent } from './components/dasboardPages/examination-form-verification/examination-form-verification.component';
import { PopupSuccessMessageComponent } from './components/popup-success-message/popup-success-message.component';
import { AbsenteeUpdateComponent } from './components/dasboardPages/absentee-update/absentee-update.component';
import { AnswerBookletDetailsComponent } from './components/dasboardPages/answer-booklet-details/answer-booklet-details.component';
import { ProgramtermPipe } from './pipes/programterm.pipe';
// import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ValidationComponent,
    StudentRegistrationComponent,
    SemesterEnrollmentNewComponent,
    ResultComponent,
    ExaminationformComponent,
    PopupMessageComponent,
    AdmitCardComponent,
    MarksEntryComponent,
    AdmitCardListComponent,
    ExaminersComponent,
    ExternalInstituteComponent,
    ExamSchedularInstituteComponent,
    AdmitCardPdfListDownloadComponent,
    AdmitCardListDownloadInstituteComponent,
    ElectivePaperComponent,
    DebarredStudentsComponent,
    TabularReportComponent,
    EditMarksComponent,
    PopupMessageForButtonsComponent,
    ExaminationFormVerificationComponent,
    PopupSuccessMessageComponent,
    AbsenteeUpdateComponent,
    AnswerBookletDetailsComponent,
    ProgramtermPipe,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatStepperModule,
    MatAutocompleteModule,
    NgxPaginationModule

  ],
  providers: [ApiService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
