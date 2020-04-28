import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../_services';
@Injectable({ providedIn: 'root' })
export class AuthTrainer implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.is_trainer == 1) {
      // authorised so return true
      // alert(currentUser.id);
      this.router.navigate(['trainer']);
      return true;
    }
    else {
      this.router.navigate(['/']);
      // not logged in so redirect to login page with the return url
      // this.router.navigate([''], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
