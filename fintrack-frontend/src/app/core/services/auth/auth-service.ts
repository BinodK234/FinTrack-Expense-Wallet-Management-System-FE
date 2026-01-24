// import { Injectable, signal } from '@angular/core';
// import { Api } from '../api/api';
// import { tap } from 'rxjs';


// export interface User {
//   name: string;
//   email: string;
// }


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {

//   currentUser = signal<User | null>(null);

//   // currentUser = this.currentUserSignal.asReadonly();
//   constructor(private api: Api) {}

//   register(data: any) {
//     return this.api.post('/auth/register', data);
//   }
//   login(data: any) {
//     return this.api.post('/auth/login', data).pipe(
//       tap((res: any) => {
//         this.saveToken(res.token)
//         debugger
//         this.currentUser.set(res.user)
//         console.log(this.currentUser);
        
//       })
//     )
//   }
//   saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//     saveUser(user: User) {
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//     getUserFromStorage(): User | null {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
// loadUserFromStorage() {
//     const user = this.getUserFromStorage();
//     if (user) {
//       this.currentUser.set(user);
//       console.log('User loaded from storage:', user);
//     }
//   }
//   logout() {
//      localStorage.removeItem('token');
//     localStorage.removeItem('user'); // Remove user data
//     this.currentUser.set(null);
//   }

//     isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }
import { Injectable, signal } from '@angular/core';
import { Api } from '../api/api';
import { tap } from 'rxjs';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private api: Api) {
    this.loadUserFromStorage(); // Load user on app initialization
  }

  register(data: any) {
    return this.api.post('/auth/register', data);
  }

  login(data: any) {
    return this.api.post('/auth/login', data).pipe(
      tap((res: any) => {
        this.saveToken(res.token);
        this.saveUser(res.user); // Save to localStorage
        this.currentUser.set(res.user); // Update signal
        console.log('User logged in:', this.currentUser());
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  loadUserFromStorage() {
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUser.set(user);
      console.log('User loaded from storage:', user);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}