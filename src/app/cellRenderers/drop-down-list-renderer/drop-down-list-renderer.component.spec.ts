import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownListRendererComponent } from './drop-down-list-renderer.component';

describe('DropDownListRendererComponent', () => {
  let component: DropDownListRendererComponent;
  let fixture: ComponentFixture<DropDownListRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownListRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownListRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
