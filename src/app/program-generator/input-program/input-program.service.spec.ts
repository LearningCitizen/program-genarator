import { TestBed } from '@angular/core/testing';

import { InputProgramService } from './input-program.service';

describe('InputProgramService', () => {
  let service: InputProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
