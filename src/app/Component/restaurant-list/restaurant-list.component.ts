import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddEditRestaurantComponent } from '../add-edit-restaurant/add-edit-restaurant.component';
import { RestaurantService } from 'src/app/Services/Restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})

export class RestaurantListComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ["sr", 'name','email', 'address', 'description', "hours",'ratings', "action"];
  dataSource = new MatTableDataSource<any>();


  constructor(public dialog: MatDialog,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getData() {
    this.restaurantService.getRestaurants().subscribe(res => {
      this.dataSource.data = res.data;
    })
  }


  addEdit(data?) {
    const dialogRef = this.dialog.open(AddEditRestaurantComponent, {
      width: '500px',
      disableClose: true,
      data: data ? data.id : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (data) {
          result.id = data.id
          result.ratings = data.ratings;
          this.restaurantService.updateRestaurant(data.id, result).subscribe(res => {
            if (res) {
              this.getData()
            }
          })
        }
        else {
          result.id = ""
          result.ratings = [];
          this.restaurantService.addRestaurant(result).subscribe(res => {
            if (res) {
              this.getData()
            }
          })
        }

      }
    });
  }

  deleteData(data) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Do you really want to delete this restaurant?' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.deleteRestaurant(data.id).subscribe(res => {
          if (res) {
            this.getData()
          }
        })
      }
    });
  }

  starChanged(event) {
    if (event) {
      this.getData();
    }
  }

}
