import { TestBed } from '@angular/core/testing';

import { PokeBallService } from './poke-ball.service';

describe('PokeBallService', () => {
  let service: PokeBallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeBallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
