import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  authService = inject(AuthService);
  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.authService.login(form.value).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.authService.saveToken(response.token);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
}
}