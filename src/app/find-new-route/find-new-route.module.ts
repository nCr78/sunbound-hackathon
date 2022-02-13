import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FindNewRouteComponent } from './find-new-route.component';
import { FindNewRouteRoutingModule } from './find-new-route-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindNewRouteRoutingModule,
  ],
  declarations: [FindNewRouteComponent]
})
export class FindNewRouteModule {}
