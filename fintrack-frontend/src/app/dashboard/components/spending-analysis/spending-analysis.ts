import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js';
import { Report } from '../../../core/services/report';

@Component({
  selector: 'app-spending-analysis',
  imports: [MatCardModule],
  templateUrl: './spending-analysis.html',
  styleUrl: './spending-analysis.scss',
})
export class SpendingAnalysis implements AfterViewInit, OnDestroy{

  @ViewChild('pie') pieRef!: ElementRef<HTMLCanvasElement>;
 private chart!: Chart;

 report = inject(Report);

   ngAfterViewInit() {
    const now = new Date();
    this.loadChart(now.getMonth() + 1, now.getFullYear());
  }
  loadChart(month: number, year: number) {
    this.report.getCategoryReport(month, year).subscribe((data: any) => {

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(this.pieRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) this.chart.destroy();
  }



}
