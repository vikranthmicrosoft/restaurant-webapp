import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

constructor(private http: HttpClient) { }

private apiUrl = 'http://ec2-44-206-238-126.compute-1.amazonaws.com/api/Restaurant';
// private apiUrl = 'https://localhost:7116/api/Restaurant';


  getRestaurants(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRestaurantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, restaurant);
  }

  updateRestaurant(id: string, restaurant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  rateRestaurant(id: string, rating: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateRestaurantRatings/${id}`, rating);
  }

}
