import { TestBed } from '@angular/core/testing';

import { HaberService } from './haber.service';

describe('HaberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HaberService = TestBed.get(HaberService);
    expect(service).toBeTruthy();
  });
});
