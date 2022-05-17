import { TestBed } from '@angular/core/testing';

import { MessageAlertsService } from './message-alerts.service';

describe('MessageAlertsService', () => {
  let service: MessageAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
