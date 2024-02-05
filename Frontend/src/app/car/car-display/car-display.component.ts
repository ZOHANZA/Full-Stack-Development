import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarServiceService } from '../car-service.service';


@Component({
  selector: 'app-car-display',
  templateUrl: './car-display.component.html',
  styleUrls: ['./car-display.component.css']
})
export class CarDisplayComponent implements OnInit{

  car:{_id:string,id:string,name:string,year:string,_v:string}[] =[];

  constructor(public carservice: CarServiceService){   }
  //https://stackoverflow.com/quetions/49699067/property=has-no-initializer-and-is-not-defianitely-assigned-in-the-constriuctor
  private carsubscription!: Subscription;

  ngOnInit() {
    this.carservice.getcar_service();
    this.carsubscription = this.carservice.getUpdateListener()
    .subscribe((car:{_id:string,id:string,name:string,year:string,_v:string}[])=>
    {
      this.car = car;
    })
    
  }
  
  ngOnDestroy()
  {
    this.carsubscription.unsubscribe();
  }

  ondelete(carid: string) {
    this.carservice.deletecar_service(carid)
  }
  



}
