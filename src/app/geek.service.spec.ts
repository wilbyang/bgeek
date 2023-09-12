import { TestBed } from '@angular/core/testing';

import { GeekService } from './geek.service';

describe('GeekService', () => {
  let service: GeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
