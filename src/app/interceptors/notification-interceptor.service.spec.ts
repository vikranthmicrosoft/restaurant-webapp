/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationInterceptorService } from './notification-interceptor.service';

describe('Service: NotificationInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationInterceptorService]
    });
  });

  it('should ...', inject([NotificationInterceptorService], (service: NotificationInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
