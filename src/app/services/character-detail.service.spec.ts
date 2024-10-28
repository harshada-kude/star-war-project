import { TestBed } from '@angular/core/testing';

import { CharacterDetailService } from './character-detail.service';

describe('CharacterDetailService', () => {
  let service: CharacterDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
