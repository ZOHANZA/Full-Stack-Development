import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { CarCreateComponent } from './car/car-create/car-create.component';
import { CarDisplayComponent } from './car/car-display/car-display.component';

const routes: Routes = [
  {path:'',component:CarDisplayComponent},
  {path:'add', component:CarCreateComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:LoginComponent}

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
