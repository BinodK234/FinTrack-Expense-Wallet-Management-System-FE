import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatedTabHeader } from '@angular/material/tabs';
import { Wallet } from '../../core/services/wallet/wallet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [MatTableModule, MatCardModule, MatPaginatorModule, MatChipsModule, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  walletService = inject(Wallet)
  dataSource = new MatTableDataSource<any>([])
  columns = ['date', 'title', 'category', 'type', 'amount'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  ngOnInit() {
    this.loadTransactions()
  }


  loadTransactions() {
    this.walletService.getTransactions().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator
    })
  }


}
