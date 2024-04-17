import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isLoggedIn = inject(LoginService).isLoggedIn;
  if (!isLoggedIn){
    inject(Router).navigate(['/login']);
  }
  return isLoggedIn;
};
