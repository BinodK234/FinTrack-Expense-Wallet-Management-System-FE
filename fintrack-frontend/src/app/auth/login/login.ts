import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  openRegisterPage() {
    this.router.navigate(['register']);
  }
  submit() {
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe((res: any) => {
      console.log(res);
      this.authService.saveToken(res.token);
      debugger;
      this.router.navigate(['dashboard']);
    });
  }
}
