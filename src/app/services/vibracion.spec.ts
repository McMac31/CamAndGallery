import { TestBed } from '@angular/core/testing';

import { Vibracion } from './vibracion';

describe('Vibracion', () => {
  let service: Vibracion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vibracion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
