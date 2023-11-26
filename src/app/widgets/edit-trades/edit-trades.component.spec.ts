import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTradesComponent } from './edit-trades.component';

describe('EditTradesComponent', () => {
  let component: EditTradesComponent;
  let fixture: ComponentFixture<EditTradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTradesComponent]
    });
    fixture = TestBed.createComponent(EditTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
