import { TestBed } from '@angular/core/testing';

import { PokeConfigService } from './poke-config.service';

describe('PokeConfigService', () => {
  let service: PokeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
