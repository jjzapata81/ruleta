import { TestBed } from '@angular/core/testing';

import { RuletaService } from './ruleta.service';

describe('RuletaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuletaService = TestBed.get(RuletaService);
    expect(service).toBeTruthy();
  });
});
