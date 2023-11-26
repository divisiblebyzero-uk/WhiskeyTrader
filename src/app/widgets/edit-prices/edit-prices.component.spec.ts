import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricesComponent } from './edit-prices.component';

describe('EditPricesComponent', () => {
  let component: EditPricesComponent;
  let fixture: ComponentFixture<EditPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPricesComponent]
    });
    fixture = TestBed.createComponent(EditPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
