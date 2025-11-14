import { TestBed } from '@angular/core/testing';

import { EstacionMeteorologica } from './estacion-meteorologica';

describe('EstacionMeteorologica', () => {
  let service: EstacionMeteorologica;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstacionMeteorologica);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
