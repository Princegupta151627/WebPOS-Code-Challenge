import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data:any;

  constructor(private auth:AuthService, private router: Router){}

  canActivate( ) {
    if (this.auth.IsLoggedIn()){
    return true;
  } 
  alert("You have not logged In...")
  this.router.navigate(['login']);
  return false;
}
}
