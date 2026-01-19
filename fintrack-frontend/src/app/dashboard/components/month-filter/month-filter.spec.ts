import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFilter } from './month-filter';

describe('MonthFilter', () => {
  let component: MonthFilter;
  let fixture: ComponentFixture<MonthFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
