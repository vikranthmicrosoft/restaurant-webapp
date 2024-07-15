/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationInterceptor } from './notification-interceptor.service';

describe('Service: NotificationInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationInterceptor]
    });
  });

  it('should ...', inject([NotificationInterceptor], (service: NotificationInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
