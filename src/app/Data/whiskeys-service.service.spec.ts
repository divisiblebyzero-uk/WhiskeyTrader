import { TestBed } from '@angular/core/testing';

import { WhiskeysServiceService } from './whiskeys-service.service';

describe('WhiskeysServiceService', () => {
  let service: WhiskeysServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskeysServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
