import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RestaurantListComponent } from './Component/restaurant-list/restaurant-list.component';
import { DeleteConfirmationDialogComponent } from './Component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { StarRatingComponent } from './Component/star-rating/star-rating.component';
import { AddEditRestaurantComponent } from './Component/add-edit-restaurant/add-edit-restaurant.component';
import { NotificationInterceptor } from './interceptors/notification-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    DeleteConfirmationDialogComponent,
    StarRatingComponent,
    AddEditRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationDialogComponent, AddEditRestaurantComponent]
})
export class AppModule { }
