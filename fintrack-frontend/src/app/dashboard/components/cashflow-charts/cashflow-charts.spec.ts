import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowCharts } from './cashflow-charts';

describe('CashflowCharts', () => {
  let component: CashflowCharts;
  let fixture: ComponentFixture<CashflowCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashflowCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
