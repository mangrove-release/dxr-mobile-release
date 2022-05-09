import { TestBed } from '@angular/core/testing';

import { LanguageSetupService } from './language-setup.service';

describe('LanguageSetupService', () => {
  let service: LanguageSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
