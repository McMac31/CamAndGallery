import { TestBed } from '@angular/core/testing';

import { LlamadaApi } from './llamada-api';

describe('LlamadaApi', () => {
  let service: LlamadaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamadaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
