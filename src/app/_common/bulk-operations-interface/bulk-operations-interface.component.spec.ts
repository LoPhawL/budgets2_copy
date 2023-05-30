import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOperationsInterfaceComponent } from './bulk-operations-interface.component';

describe('BulkOperationsInterfaceComponent', () => {
  let component: BulkOperationsInterfaceComponent;
  let fixture: ComponentFixture<BulkOperationsInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOperationsInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkOperationsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
