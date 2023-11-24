import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhiskeyLauncherComponent } from './edit-whiskey-launcher.component';

describe('EditWhiskeyLauncherComponent', () => {
  let component: EditWhiskeyLauncherComponent;
  let fixture: ComponentFixture<EditWhiskeyLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWhiskeyLauncherComponent]
    });
    fixture = TestBed.createComponent(EditWhiskeyLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
