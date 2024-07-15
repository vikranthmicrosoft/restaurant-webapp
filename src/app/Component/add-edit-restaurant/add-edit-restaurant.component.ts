import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RestaurantService } from 'src/app/Services/Restaurant.service';

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.css']
})
export class AddEditRestaurantComponent implements OnInit {

  restaurantForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder : FormBuilder,
  private restaurantService : RestaurantService) {
      this.restaurantForm = this.formBuilder.group({
        name : ["",Validators.compose([Validators.required,Validators.pattern("^[A-Za-z]+[A-Za-z ]*$"),Validators.maxLength(50)])],
        address : ["",Validators.compose([Validators.required,Validators.maxLength(500)])],
        description : ["",Validators.compose([Validators.required,Validators.maxLength(250)])],
        hours : ["",Validators.compose([Validators.required,Validators.pattern(/\b(0?[1-9]|1[0-2]):[0-5][0-9] [APap][Mm] - (0?[1-9]|1[0-2]):[0-5][0-9] [APap][Mm]\b/)])],
        emailAddress : ["",Validators.compose([Validators.email,Validators.required])]
      })
    }
  
  ngOnInit() {
    if(this.data){
      this.getData(this.data)
    }
  }

  getData(id){
    this.restaurantService.getRestaurantById(id).subscribe(res=>{
      if(res.data){
        for(var property in res.data){
          if(this.restaurantForm.controls[property]){
            this.restaurantForm.controls[property].setValue(res.data[property]);
          }
        }
      }
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(){
    if(this.restaurantForm.valid){
      this.dialogRef.close(this.restaurantForm.value);
    }
  }

}
