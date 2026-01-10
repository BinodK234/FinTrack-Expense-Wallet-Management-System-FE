import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  router = inject(Router);
  authService = inject(AuthService)
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  openLoginPage(){
    this.router.navigate(['']);
  }

  submit(){
    console.log(this.form.value);
    this.authService.register(this.form.value).subscribe((res: any) => {
      // if (res.Status == 201) {
        alert(res.message)
        this.router.navigate(['']);
      // }
    })
  }
}
