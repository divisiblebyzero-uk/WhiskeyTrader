import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskeyDetailsComponent } from './whiskey-details.component';

describe('WhiskeyDetailsComponent', () => {
  let component: WhiskeyDetailsComponent;
  let fixture: ComponentFixture<WhiskeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiskeyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
