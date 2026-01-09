import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: Api) {}

  register(data: any) {
    return this.api.post('/auth/register', data);
  }
  login(data: any) {
    return this.api.post('/auth/login', data);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
