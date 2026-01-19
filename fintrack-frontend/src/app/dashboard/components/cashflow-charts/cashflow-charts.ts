import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Chart from 'chart.js/auto';
import { Report } from '../../../core/services/report';
import { DashboardState } from '../../state/dashboard-state';
@Component({
  selector: 'app-cashflow-charts',
  imports: [MatCardModule],
  templateUrl: './cashflow-charts.html',
  styleUrl: './cashflow-charts.scss',
})
export class CashflowCharts implements AfterViewInit, OnDestroy {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;

  report = inject(Report);
  state = inject(DashboardState)

  constructor() {
    effect(() => {
      this.loadChart(this.state.month(), this.state.year());

    })
  }

  private chart!: Chart;

  ngAfterViewInit(): void {
    const now = new Date();
    this.loadChart(now.getMonth() + 1, now.getFullYear());
  }

  loadChart(month: number, year: number) {
    this.report.getCashflow(month, year).subscribe((data: any) => {
      const labels = Object.keys(data);
      const credit = labels.map((label) => data[label].credit);
      const debit = labels.map((label) => data[label].debit);

      if (this.chart) this.chart.destroy();
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Credit',
              data: credit,
              tension: 0.4,
            },
            {
              label: 'Debit',
              data: debit,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
  }
  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }
}
