import { TestBed } from '@angular/core/testing';

import { CashingService } from './cashing.service';

describe('CashingService', () => {
  let service: CashingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
