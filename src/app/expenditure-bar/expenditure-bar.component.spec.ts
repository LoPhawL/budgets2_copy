import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureBarComponent } from './expenditure-bar.component';

describe('ExpenditureBarComponent', () => {
  let component: ExpenditureBarComponent;
  let fixture: ComponentFixture<ExpenditureBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenditureBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
