import { TestBed } from '@angular/core/testing';

import { MenifestoService } from './menifesto.service';

describe('MenifestoService', () => {
  let service: MenifestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenifestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
