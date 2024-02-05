import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../auth/auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  private cardisplay:{_id:string,id:string,name:string,year:string,_v:string}[] =[];
  private updatedcardisplay = new Subject<{_id:string,id:string,name:string,year:string,_v:string}[]>();

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  addcar_service(pid: string, pname: string, pyear: string) {
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const options = { headers: headers };
  
    this.http.post<{ message: string, car: any }>('https://localhost:3000/api/car', { id: pid, name: pname, year: pyear }, options)
      .subscribe((thecar) => {
        this.cardisplay.push(thecar.car);
        this.updatedcardisplay.next([...this.cardisplay]);
      });
  }
  

  getcar_service(){
    this.http.get<{message:string,car:any}>('https://localhost:3000/api/car')
    .subscribe((thecar)=>
    {
      this.cardisplay =thecar.car
      this.updatedcardisplay.next([...this.cardisplay]);
    })
  }

  deletecar_service(carid: string)
  {
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const options = { headers: headers };
    this.http.delete('https://localhost:3000/api/car/'+ carid, options)
    .subscribe(()=>
    {
      const updatedcardisplay = this.cardisplay.filter(car=>car._id!==carid);
      this.cardisplay= updatedcardisplay;
      this.updatedcardisplay.next([...this.cardisplay]);
    })
  }

  getUpdateListener()
  {
    return this.updatedcardisplay.asObservable();
  }


 
}
