import { TestBed } from '@angular/core/testing';

import { WhiskeyTradesService } from './whiskey-trades.service';

describe('WhiskeyTradesService', () => {
  let service: WhiskeyTradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeyTradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
