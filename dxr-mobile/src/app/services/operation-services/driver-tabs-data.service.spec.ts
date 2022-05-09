import { TestBed } from '@angular/core/testing';

import { DriverTabsDataService } from './driver-tabs-data.service';

describe('DriverTabsDataService', () => {
  let service: DriverTabsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverTabsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
