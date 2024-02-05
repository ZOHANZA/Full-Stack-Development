import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit  {

 constructor(public carservice: CarServiceService) {}

 ngOnInit(): void {}
   
  onaddCar( carform: NgForm) {
    if (carform.invalid)
    {
      alert('Invalid!')
      return;
    }
    alert(carform.value.enteredID+ ':'+ carform.value.enteredName)

    this.carservice.addcar_service(carform.value.enteredID,carform.value.enteredName,carform.value.enteredYear)
    carform.resetForm()
  }
 }


