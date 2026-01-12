import { inject, Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  api = inject(Api);

  getRecentTransactions(){
    return this.api.get('/wallet/transactions?limit=5');
  }

  getWalletSummary(){
    return this.api.get('/wallet/summary');
  }
  
}
