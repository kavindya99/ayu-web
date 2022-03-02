import { TestBed } from '@angular/core/testing';

import { AyuService } from './ayu.service';

describe('AyuService', () => {
  let service: AyuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
