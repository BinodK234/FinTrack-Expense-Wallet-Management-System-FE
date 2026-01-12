import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendMoney } from './spend-money';

describe('SpendMoney', () => {
  let component: SpendMoney;
  let fixture: ComponentFixture<SpendMoney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendMoney]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendMoney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
