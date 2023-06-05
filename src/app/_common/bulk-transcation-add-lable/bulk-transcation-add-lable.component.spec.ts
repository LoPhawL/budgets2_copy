import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTranscationAddLableComponent } from './bulk-transcation-add-lable.component';

describe('BulkTranscationAddLableComponent', () => {
  let component: BulkTranscationAddLableComponent;
  let fixture: ComponentFixture<BulkTranscationAddLableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkTranscationAddLableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkTranscationAddLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
