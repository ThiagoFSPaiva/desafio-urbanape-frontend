import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../app/services/auth/auth.service';
import { getJwtToken } from '../app/services/auth/auth.interceptor';



export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (!authService.isLoggedIn() || !authService.isAdmin()) {
    authService.logout();
      return false;  
  }

  return true;
};