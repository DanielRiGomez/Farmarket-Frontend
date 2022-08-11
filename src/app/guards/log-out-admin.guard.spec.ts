import { TestBed } from '@angular/core/testing';

import { LogOutAdminGuard } from './log-out-admin.guard';

describe('LogOutAdminGuard', () => {
  let guard: LogOutAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogOutAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
