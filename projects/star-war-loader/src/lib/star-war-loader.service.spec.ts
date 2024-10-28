import { TestBed } from '@angular/core/testing';

import { StarWarLoaderService } from './star-war-loader.service';

describe('StarWarLoaderService', () => {
  let service: StarWarLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
