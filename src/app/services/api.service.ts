import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  url='http://localhost:5050/api/v1';
 // url='http://223.235.71.34:5050/api/v1';

  login(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/login`,data);
  }
  validation(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/userauthentication`,data);
  }
  registration(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/registerstudent`,data);
  }
  sendOtpToEmail(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/sendemailotp`,data);
  }
  sendOtpToMobile(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/sendmobileotp`,data);
  }
  emailVerification(data:any):Observable<any>
  {
      return this._http.get(`${this.url}/emailverify?bceceId=${data.bceceId}&dob=${data.dob}&emailotp=${data.emailotp}`);
  }
  mobileVerification(data:any):Observable<any>
  {
      return this._http.get(`${this.url}/numberverify?bceceId=${data.bceceId}&dob=${data.dob}&mobileotp=${data.mobileotp}`);
  }


  acedmicTerm():Observable<any>
  {
      return this._http.get(`${this.url}/studentacedmicterm`);
  }

 

 studentExaminationForm(data:any):Observable<any>
  {   const jwtToken = localStorage.getItem('token'); 
       console.log("token="+jwtToken);
      // Set the Authorization header with the JWT token
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${jwtToken}`
  });
      return this._http.get(`${this.url}/examinationform?acedTerm=${data.acedTerm}&progTerm=${data.progTerm}`,{ headers: headers });
  }

  
  internalMarks(data:any):Observable<any>
  {
      return this._http.get(`${this.url}/internalmarks?acedTerm=${data.acedTerm}&progTerm=${data.progTerm}`);
  }

  examinationFornSubmit(data:any):Observable<any>
  {
      return this._http.post(`${this.url}/submitexaminationform`,data);
  }

  downloadExaminationFormPDF(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/downloadexaminationForm?academicTerm=${data.academicTerm}&term=${data.term}&studentId=${data.studentId}&rollnumber=${data.rollnumber}`,{ responseType: 'arraybuffer' }); 
  }

  downloadAdmitCard(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/downloadAdmitCard?rollNumber=${data.rollNumber}`,{ responseType: 'arraybuffer' });
  }

  getAdmitCardDetails(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/getAdmitCardDetails?rollnumber=${data.rollnumber}`);
  }
  getExaminers():Observable<any>
  {
      return this._http.get(`${this.url}/`);
  }

  getAllProgramTermList():Observable<any>
  {
    return this._http.get(`${this.url}/getProgramList`);
  }

  getInstituteAdmitCardListDetails(data:any):Observable<any>
  {
    return this._http.get(`${this.url}/getInstituteAdmitCards?academicTerm=${data.academicTerm}&instituteId=${data.instituteId}&programId=${data.programId}&term=${data.term}`);
  }

  getAllCenter():Observable<any>
  {
    return this._http.get(`${this.url}/getAllCenterList`);
  }

  getAllInstitute():Observable<any>
  {
    return this._http.get(`${this.url}/getAllInstituteList`);
  }

  getAllInstituteForExamCenter(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/getAllInstituteListForExamCenter`,data);
  }

  downloadAdmitCardList(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/downloadAdmitCardList?pdfFileName=${data.pdfFileName}&centerId=${data.centerId}&instituteId=${data.instituteId}&academicTerm=${data.academicTerm}&term=${data.term}`,{ responseType: 'arraybuffer' });
  }

  verifyStudentByInstitute(data:any):Observable<any>
  {  
      return this._http.post(`${this.url}/verifyStudentByInstitute`,data);
  }

  unverifyStudentByInstitute(data:any):Observable<any>
  {  
      return this._http.post(`${this.url}/unverifyStudentByInstitute`,data);
  }

  getStudentNameByRegNo(registrationNo:string):Observable<any>
  {  
      return this._http.get(`${this.url}/findNameFromRegNo?id=${registrationNo}`);
  }

  getAllDebarredStudent(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/getAllDebarredStudent?id=${data.id}`);
  }

  addDebarredStudent(data:any):Observable<any>
  {  
      return this._http.post(`${this.url}/addDebarredStudent`,data);
  }


  removeDebarredStudent(data:any):Observable<any>
  {  
      return this._http.put(`${this.url}/removeDebarredStudent`,data);
  }

  getExamTypeName():Observable<any>
  {  
      return this._http.get(`${this.url}/examType`);
  }

  showBulkRecord(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/showBulkRecords?searchOption=${data.searchOption}&acedmmicTerm=${data.acedmmicTerm}&progTerm=${data.progTerm}&exampType=${data.exampType}&programId=${data.programId}&instituteId=${data.instituteId}`);
  }

  operator1Click(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/operator1Click?action=${data.action}&taskId=${data.taskId}&opr1Fin=${data.opr1Fin}&opr2Fin=${data.opr2Fin}&oprFin=${data.oprFin}`);
  }

  operator2Click(data:any):Observable<any>
  {  
      return this._http.get(`${this.url}/operator2Click?action=${data.action}&taskId=${data.taskId}&opr1Fin=${data.opr1Fin}&opr2Fin=${data.opr2Fin}&oprFin=${data.oprFin}`);
  }


  enterBulkMarksByOperator(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/enterBulkMarksOperators`,data);
  }
  

  addBulkMarksByOperator1Action(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/operator1Action`,data);
  }

  addBulkMarksOperator2Action(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/operator2Action`,data);
  }

  
  completeTaskByOperator(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/completeTaskOperator`,data);
  }

  compilerClick(data:any):Observable<any>
  {
    return this._http.get(`${this.url}/compilerClick?action=${data.action}&taskId=${data.taskId}&opr1Fin=${data.opr1Fin}&opr2Fin=${data.opr2Fin}&oprFin=${data.oprFin}`);
  }
  
  viewEtriesByOperator(data:any):Observable<any>{
    return this._http.get(`${this.url}/operatorEntriesTaskCompleted?action=${data.action}&taskId=${data.taskId}&opr1Fin=${data.opr1Fin}&opr2Fin=${data.opr2Fin}&oprFin=${data.oprFin}`);
  }
  

  enterBulkMarksByCompiler(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/enterBulkMarksCompiler`,data);
  }
  

  CompleteTaskBulkMarksByCompiler(data:any):Observable<any>
  {
    return this._http.post(`${this.url}/completeTaskCompiler`,data);
  }


  downloadExaminationFormVerificationReport(data:any):Observable<any>
  {
    return this._http.get(`${this.url}/getExaminationformverificationReport?atr=${data.atr}&term=${data.term}&inst=${data.inst}&prog=${data.prog}`, { responseType: 'arraybuffer' });
  }
  
  getElectivePaperList(data:any):Observable<any>{
    return this._http.get(`${this.url}/getElectivePaperList?syllabus=${data.syllabus}&term=${data.term}&programId=${data.programId}`)
  }

  saveElectivePaperList(data:any):Observable<any>{
    return  this._http.post(`${this.url}/saveElectivePaperList`,data);
  }

  getSelectedElectivePaperList(data:any):Observable<any>{
    return this._http.get(`${this.url}/getSelectedElectivePaperList?instId=${data.instId}&syllabus=${data.syllabus}&term=${data.term}&programId=${data.programId}`)
  }

  getinternalEditingMarks(rollno:number):Observable<any>{
    return this._http.get(`${this.url}/internalEditMarks?rollNumber=${rollno}`);
  }

  editInternalMarks(data:any):Observable<any>{
    return this._http.put(`${this.url}/updateInternalEditMarks`,data);
  }

}

