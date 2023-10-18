import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../../core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.localStorageService.getToken();
    if(token){
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      if(this.tokenIsValid(decodedToken.exp))
        return true
    }
    this.router.navigate(['/login'])
    return false;
  }
  tokenIsValid(expiryTime: any): boolean {
    return Math.floor(new Date().getTime() / 1000) < expiryTime
  }
}
