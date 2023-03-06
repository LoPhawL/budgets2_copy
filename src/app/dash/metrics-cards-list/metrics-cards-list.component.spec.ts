import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsCardsListComponent } from './metrics-cards-list.component';

describe('MetricsCardsListComponent', () => {
  let component: MetricsCardsListComponent;
  let fixture: ComponentFixture<MetricsCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsCardsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
