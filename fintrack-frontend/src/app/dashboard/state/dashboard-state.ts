import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardState {

  month = signal(new Date().getMonth() + 1);
  year = signal(new Date().getFullYear());

  setMonth(month: number) {
    this.month.set(month);
  }

  setYear(year: number) {
    this.year.set(year);
  }
}
