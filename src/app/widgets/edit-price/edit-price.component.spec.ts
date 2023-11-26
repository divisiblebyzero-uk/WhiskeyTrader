import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceComponent } from './edit-price.component';

describe('EditPriceComponent', () => {
  let component: EditPriceComponent;
  let fixture: ComponentFixture<EditPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPriceComponent]
    });
    fixture = TestBed.createComponent(EditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
