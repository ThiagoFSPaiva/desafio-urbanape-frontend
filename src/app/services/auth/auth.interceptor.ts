import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const jwtToken = getJwtToken();
    if (jwtToken) {
      var cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      return next(cloned);
    }
    return next(req);
  };

  export function getJwtToken(): string | null {
    let tokens: any = localStorage.getItem('JWT_TOKEN');
    if (!tokens) return null;
    const token = JSON.parse(tokens).token;
    return token;
  }