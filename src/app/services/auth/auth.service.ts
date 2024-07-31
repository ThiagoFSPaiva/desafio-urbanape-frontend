import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { getJwtToken } from './auth.interceptor';
import { UserService } from '../user/user.service';

export interface DecodedToken {
  exp: number;
  iat: number;
  sub: string;
  role: string; 

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
 
  private baseURl = `${environment.api}/auth`;
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  constructor() {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(this.baseURl, user)
      .pipe(
        tap((tokens: any) => {
          this.doLoginUser(user.email, JSON.stringify(tokens));
          const userId = this.getIdUser();
          if (userId !== null) {
            this.userService.getUser(userId).subscribe((user) => {
              localStorage.setItem('user', JSON.stringify(user));
            });
          }
        })
      );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.JWT_TOKEN);
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem(this.JWT_TOKEN);
    }
    
    return false;
  }

  isAdmin(): boolean {
    const token = getJwtToken()
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.role === 'ADMIN';
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
    return false;
  }

  getIdUser(): string | null {
    const token = getJwtToken();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.sub;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
    return null;
  }

}