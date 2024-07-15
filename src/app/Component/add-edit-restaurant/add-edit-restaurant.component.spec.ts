/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddEditRestaurantComponent } from './add-edit-restaurant.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AddEditRestaurantComponent', () => {
  let component: AddEditRestaurantComponent;
  let fixture: ComponentFixture<AddEditRestaurantComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddEditRestaurantComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AddEditRestaurantComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { name: '', address: '', description: '', hours: '' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data', () => {
    expect(component.restaurantForm.value).toEqual({
      name: '',
      address: '',
      description: '',
      hours: ''
    });
  });

  it('should close the dialog on cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog with form data on save if form is valid', () => {
    component.restaurantForm.setValue({
      name: 'Test Restaurant',
      address: '123 Test St',
      description: 'A test restaurant',
      hours: '9am - 9pm'
    });
    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'Test Restaurant',
      address: '123 Test St',
      description: 'A test restaurant',
      hours: '9am - 9pm'
    });
  });

  it('should not close the dialog on save if form is invalid', () => {
    component.restaurantForm.setValue({
      name: '',
      address: '',
      description: '',
      hours: ''
    });
    component.save();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});