import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashboardState } from '../../state/dashboard-state';

@Component({
  selector: 'app-month-filter',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './month-filter.html',
  styleUrl: './month-filter.scss',
})
export class MonthFilter {

    state = inject(DashboardState);

  months = [
    {value:1,label:'Jan'},{value:2,label:'Feb'},{value:3,label:'Mar'},
    {value:4,label:'Apr'},{value:5,label:'May'},{value:6,label:'Jun'},
    {value:7,label:'Jul'},{value:8,label:'Aug'},{value:9,label:'Sep'},
    {value:10,label:'Oct'},{value:11,label:'Nov'},{value:12,label:'Dec'}
  ];

  years = [2024, 2025, 2026, 2027];

}
