import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskeyFullDetailsComponent } from './whiskey-full-details.component';

describe('WhiskeyFullDetailsComponent', () => {
  let component: WhiskeyFullDetailsComponent;
  let fixture: ComponentFixture<WhiskeyFullDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhiskeyFullDetailsComponent]
    });
    fixture = TestBed.createComponent(WhiskeyFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
