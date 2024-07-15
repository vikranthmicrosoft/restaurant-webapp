import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestaurantService } from 'src/app/Services/Restaurant.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() id : string;
  @Output() starChanged = new EventEmitter<boolean>();
  iconClass = {
    0: 'far fa-star',
    0.5: 'fas fa-star-half-alt',
    1: 'fas fa-star'
  }

  stars: number[] = [0, 0, 0, 0, 0]; //five empty stars

  constructor(private restaurantService : RestaurantService) { }

  ngOnChanges(){
    this.fillStars();
  }

  ngOnInit() {
    
  }

  fillStars(){
    this.stars = [0, 0, 0, 0, 0]
    var starsToFill = Math.round(this.rating * 2)/2; //round to nearest 0.5
    var i = 0;
    while(starsToFill > 0.5){
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }
    if(starsToFill === 0.5){
      this.stars[i] = 0.5;
    }
  }

  addStar(index){
    this.rating = index + 1;
    this.fillStars();
    this.restaurantService.rateRestaurant(this.id,this.rating).subscribe(res=>{
      this.starChanged.emit(true);
    })
  }
  
}
