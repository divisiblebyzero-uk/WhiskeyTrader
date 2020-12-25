import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsCellRendererComponent } from './show-details-cell-renderer.component';

describe('ShowDetailsCellRendererComponent', () => {
  let component: ShowDetailsCellRendererComponent;
  let fixture: ComponentFixture<ShowDetailsCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
