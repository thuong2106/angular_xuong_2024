import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginForm, RegisterForm, User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:4000/auth';
  http = inject(HttpClient);
  constructor() {}

  register(data: RegisterForm) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginForm) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // getUsers() {
  //   return this.http.get<User[]>(this.apiUrl);
  // }


  // deleteUser(id: number) {
  //   return this.http.delete<User>(`${this.apiUrl}/${id}`);
  // }
}
