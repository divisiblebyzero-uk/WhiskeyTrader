import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricesLauncherComponent } from './edit-prices-launcher.component';

describe('EditPricesLauncherComponent', () => {
  let component: EditPricesLauncherComponent;
  let fixture: ComponentFixture<EditPricesLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPricesLauncherComponent]
    });
    fixture = TestBed.createComponent(EditPricesLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
