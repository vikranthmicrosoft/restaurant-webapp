import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../Services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 200) {
          this.snackBar.open(event.body.message, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar','my-custom-snackbar'],
            direction : 'ltr'
          });
          this.loaderService.hideLoader()
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        this.loaderService.hideLoader()
        debugger
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar','my-custom-snackbar']
        });
        return throwError(errorMessage);
      })
    );
  }
}
