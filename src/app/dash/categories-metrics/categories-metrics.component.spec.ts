import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMetricsComponent } from './categories-metrics.component';

describe('CategoriesMetricsComponent', () => {
  let component: CategoriesMetricsComponent;
  let fixture: ComponentFixture<CategoriesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
