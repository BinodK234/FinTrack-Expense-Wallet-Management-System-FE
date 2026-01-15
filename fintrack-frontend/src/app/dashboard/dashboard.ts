import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../core/services/dashboard/dashboard-service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialog } from '../wallet/transaction-dialog/transaction-dialog';
import { CashflowCharts } from './components/cashflow-charts/cashflow-charts';
import { SpendingAnalysis } from './components/spending-analysis/spending-analysis';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    DatePipe,
    RouterLink,
    CashflowCharts,
    SpendingAnalysis
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  dashboardService = inject(DashboardService);
  // private cdr = inject(ChangeDetectorRef);
  dialog = inject(MatDialog)

  summary = signal({
    balance: 0,
    totalCredit: 0,
    totalDebit: 0
  });

  transactions = signal<any[]>([]);
  ngOnInit(): void {
    this.loadDashboard();
  }

loadDashboard() {
  this.dashboardService.getWalletSummary().subscribe({
    next: (res: any) => {
      // this.summary = res; // important: new reference
      console.log('After assignment, this.summary:', this.summary);
      this.summary.set(res);
      // this.cdr.detectChanges();
    },
    error: err => console.error(err)
  });

  this.dashboardService.getRecentTransactions().subscribe({
    next: (res: any) => {
      console.log('Transactions Response:', res);
      this.transactions.set(res);
    },
    error: err => console.error(err)
  });
}
openTransaction(type: 'CREDIT' | 'DEBIT'){
  const ref = this.dialog.open(TransactionDialog, {
    width: '480px',
    panelClass: 'fin-dialog',
    data: {type}
  })
   ref.afterClosed().subscribe(refresh => {
    if (refresh) {
      this.loadDashboard(); // reload summary + recent
    }
  });

}
}
