import { TestBed } from '@angular/core/testing';

import { WhiskeyDataService } from './whiskey-data.service';

describe('WhiskeyDataService', () => {
  let service: WhiskeyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
