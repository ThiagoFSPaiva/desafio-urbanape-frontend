import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';
import { User, UserCreation, UserResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = `${environment.api}/user`;

  constructor(private httpClient: HttpClient){
  }

  getUser(id?: string): Observable<UserResponse> {
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.httpClient.get<UserResponse>(url);
  }

  getUserLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  createUser(userCreation: UserCreation): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, userCreation);
  }

  updateUser(userUpdate: UserCreation, id: string): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${id}`, userUpdate);
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
