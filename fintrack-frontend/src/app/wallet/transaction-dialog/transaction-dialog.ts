import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Wallet } from '../../core/services/wallet/wallet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepicker,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './transaction-dialog.html',
  styleUrl: './transaction-dialog.scss',
})
export class TransactionDialog {
  fb = inject(FormBuilder);
  walletService = inject(Wallet);
  snack = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<TransactionDialog>);
  mode: 'CREDIT' | 'DEBIT' | undefined;
  categories = ['Salary', 'Freelance', 'Food', 'Transport', 'Shopping', 'Bills', 'Others'];
  form = this.fb.group({
    title: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(1)]],
    date: [new Date()],
    category: ['', Validators.required],
  });

  setMode(type: 'CREDIT' | 'DEBIT') {
    this.mode = type;
  }

  close() {
    this.dialogRef.close();
  }

  selectCategory(category: string) {
    this.form.patchValue({ category });
  }

  submit() {
    if (this.form.invalid) return;
    const payload = {
      amount: this.form.value.amount,
      category: this.form.value.category,
      description: this.form.value.title,
    };
    const call =
      this.mode === 'CREDIT'
        ? this.walletService.addMoney(payload)
        : this.walletService.spendMoney(payload);
    call.subscribe({
      next: (res) => {
        this.snack.open('Transaction added', 'OK', { duration: 2500 });
        this.dialogRef.close(true);
      },
    });
  }
}
