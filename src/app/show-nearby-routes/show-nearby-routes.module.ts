import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowNearbyRoutesPageRoutingModule } from './show-nearby-routes-routing.module';

import { ShowNearbyRoutesPage } from './show-nearby-routes.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowNearbyRoutesPageRoutingModule,
        GoogleMapsModule
    ],
  declarations: [ShowNearbyRoutesPage]
})
export class ShowNearbyRoutesPageModule {}
