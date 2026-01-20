import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router)

  const token = auth.getToken();
  const authToken = token != null ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : req;

  return next(authToken).pipe(
    catchError(error => {
      if(error.status === 401) {
        auth.logout();
        router.navigate(['/']);
      }
      throw error;
    })
  );
};
