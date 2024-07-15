import { Component, OnInit } from '@angular/core';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurant-app';
  loader = true;
  constructor(private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe(res=>{
      this.loader = res;
    })
  }

}
