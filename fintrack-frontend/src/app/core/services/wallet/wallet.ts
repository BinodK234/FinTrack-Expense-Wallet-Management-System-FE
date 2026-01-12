import { inject, Injectable } from '@angular/core';
import { Api } from '../api/api'
@Injectable({
  providedIn: 'root',
})
export class Wallet {
  api = inject(Api);

    addMoney(data: any) {
    return this.api.post('/wallet/add', data);
  }

  
  spendMoney(data: any) {
    return this.api.post('/wallet/spend', data);
  }

  getTransactions() {
    return this.api.get('/wallet/transactions');
  }
  
}
