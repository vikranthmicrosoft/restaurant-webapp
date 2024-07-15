/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestaurantListComponent } from './restaurant-list.component';
import { of } from 'rxjs';
import { RestaurantService } from 'src/app/Services/Restaurant.service';
import { MatDialog } from '@angular/material';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let restaurantServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    restaurantServiceMock = {
      getRestaurants: jasmine.createSpy('getRestaurants').and.returnValue(of({ data: [] })),
      updateRestaurant: jasmine.createSpy('updateRestaurant').and.returnValue(of(true)),
      addRestaurant: jasmine.createSpy('addRestaurant').and.returnValue(of(true)),
      deleteRestaurant: jasmine.createSpy('deleteRestaurant').and.returnValue(of(true))
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    await TestBed.configureTestingModule({
      declarations: [RestaurantListComponent],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    component.ngOnInit();
    expect(restaurantServiceMock.getRestaurants).toHaveBeenCalled();
  });

  it('should call getData when starChanged is triggered', () => {
    spyOn(component, 'getData');
    component.starChanged(true);
    expect(component.getData).toHaveBeenCalled();
  });

  it('should open dialog and call addRestaurant on addEdit without data', () => {
    component.addEdit();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(restaurantServiceMock.addRestaurant).toHaveBeenCalled();
  });

  it('should open dialog and call updateRestaurant on addEdit with data', () => {
    const data = { id: 1, ratings: [] };
    component.addEdit(data);
    expect(dialogMock.open).toHaveBeenCalled();
    expect(restaurantServiceMock.updateRestaurant).toHaveBeenCalledWith(data.id, jasmine.any(Object));
  });

  it('should open dialog and call deleteRestaurant on deleteData', () => {
    const data = { id: 1 };
    component.deleteData(data);
    expect(dialogMock.open).toHaveBeenCalled();
    expect(restaurantServiceMock.deleteRestaurant).toHaveBeenCalledWith(data.id);
  });
});