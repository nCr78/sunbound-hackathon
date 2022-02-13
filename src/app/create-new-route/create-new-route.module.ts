import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewRouteRoutingModule } from './create-new-route-routing.module';
import { CreateNewRouteComponent } from './create-new-route.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewRouteRoutingModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  declarations: [CreateNewRouteComponent]
})
export class CreateNewRouteModule {}
