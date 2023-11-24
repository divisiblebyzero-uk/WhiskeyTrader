import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhiskeyComponent } from './edit-whiskey.component';

describe('EditWhiskeyComponent', () => {
  let component: EditWhiskeyComponent;
  let fixture: ComponentFixture<EditWhiskeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWhiskeyComponent]
    });
    fixture = TestBed.createComponent(EditWhiskeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
