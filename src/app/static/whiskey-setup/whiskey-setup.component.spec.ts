import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskeySetupComponent } from './whiskey-setup.component';

describe('WhiskeySetupComponent', () => {
  let component: WhiskeySetupComponent;
  let fixture: ComponentFixture<WhiskeySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiskeySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
