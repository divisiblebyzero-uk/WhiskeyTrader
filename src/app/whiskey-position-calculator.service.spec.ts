import { TestBed } from '@angular/core/testing';

import { WhiskeyPositionCalculatorService } from './whiskey-position-calculator.service';

describe('WhiskeyPositionCalculatorService', () => {
  let service: WhiskeyPositionCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeyPositionCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
