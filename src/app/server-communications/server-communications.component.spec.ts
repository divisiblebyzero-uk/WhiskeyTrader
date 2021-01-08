import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCommunicationsComponent } from './server-communications.component';

describe('ServerCommunicationsComponent', () => {
  let component: ServerCommunicationsComponent;
  let fixture: ComponentFixture<ServerCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerCommunicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
