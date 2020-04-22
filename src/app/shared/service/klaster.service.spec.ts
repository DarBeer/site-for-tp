import { TestBed } from '@angular/core/testing';

import { KlasterService } from './klaster.service';

describe('KlasterService', () => {
  let service: KlasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
