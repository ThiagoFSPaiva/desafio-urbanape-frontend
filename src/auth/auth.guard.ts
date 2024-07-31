import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../app/services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  let authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    authService.logout();
    return false;
  }
  
  return true;
};