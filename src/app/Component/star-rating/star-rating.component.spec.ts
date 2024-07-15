/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarRatingComponent } from './star-rating.component';
import { RestaurantService } from 'src/app/Services/Restaurant.service';
import { of } from 'rxjs';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let restaurantServiceStub: Partial<RestaurantService>;

  beforeEach(async () => {
    restaurantServiceStub = {
      rateRestaurant: (id: string, rating: number) => of(true)
    };

    await TestBed.configureTestingModule({
      declarations: [ StarRatingComponent ],
      providers: [{ provide: RestaurantService, useValue: restaurantServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill stars correctly', () => {
    component.rating = 3.5;
    component.fillStars();
    expect(component.stars).toEqual([1, 1, 1, 0.5, 0]);
  });

  it('should emit starChanged event on addStar', () => {
    spyOn(component.starChanged, 'emit');
    component.addStar(2);
    expect(component.starChanged.emit).toHaveBeenCalledWith(true);
  });

  it('should call rateRestaurant on addStar', () => {
    const rateRestaurantSpy = spyOn(restaurantServiceStub, 'rateRestaurant').and.callThrough();
    component.addStar(2);
    expect(rateRestaurantSpy).toHaveBeenCalledWith(component.id, 3);
  });

  it('should update rating and stars on addStar', () => {
    component.addStar(2);
    expect(component.rating).toBe(3);
    expect(component.stars).toEqual([1, 1, 1, 0, 0]);
  });
});