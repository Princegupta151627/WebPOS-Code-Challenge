import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ValidationComponent } from './components/validation/validation.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'validation', component: ValidationComponent}, 
  {path: 'validation/:registration', component: RegistrationComponent}, 

  
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
