import { TestBed } from '@angular/core/testing';

import { WhiskeyPricesService } from './whiskey-prices.service';

describe('WhiskeyPricesService', () => {
  let service: WhiskeyPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeyPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
