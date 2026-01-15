import { inject, Injectable } from '@angular/core';
import { Api } from '../services/api/api'
@Injectable({
  providedIn: 'root',
})
export class Report {

  api = inject(Api)

  getMonthlySummary(month: number, year: number) {
    return this.api.get(`/reports/monthly?month=${month}&year=${year}`);
  }

    getCashflow(month: number, year: number) {
    return this.api.get(`/reports/cashflow?month=${month}&year=${year}`);
  }

  getCategoryReport(month: number, year: number) {
    return this.api.get(`/reports/categories?month=${month}&year=${year}`);
  }
  
}
