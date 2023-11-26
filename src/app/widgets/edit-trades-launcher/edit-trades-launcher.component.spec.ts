import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTradesLauncherComponent } from './edit-trades-launcher.component';

describe('EditTradesLauncherComponent', () => {
  let component: EditTradesLauncherComponent;
  let fixture: ComponentFixture<EditTradesLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTradesLauncherComponent]
    });
    fixture = TestBed.createComponent(EditTradesLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
