import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Wallet } from '../../core/services/wallet/wallet';
import { MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-add-money',
  imports: [MatLabel, MatFormFieldModule, MatCardSubtitle, MatCardTitle, MatCardModule, ReactiveFormsModule],
  templateUrl: './add-money.html',
  styleUrl: './add-money.scss',
})
export class AddMoney {

    loading = false;
  form: FormGroup;
        constructor(
    private fb: FormBuilder,
    private walletService: Wallet,
    private snack: MatSnackBar,
    private router: Router
  ) {

  this.form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(1)]],
    description: ['']
  });
}



   submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.walletService.addMoney(this.form.value).subscribe({
      next: () => {
        this.snack.open('Money added successfully', 'OK', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.snack.open(err.error?.message || 'Something went wrong', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

}
