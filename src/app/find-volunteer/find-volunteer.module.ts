import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindVolunteerPageRoutingModule } from './find-volunteer-routing.module';

import { FindVolunteerPage } from './find-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindVolunteerPageRoutingModule
  ],
  declarations: [FindVolunteerPage]
})
export class FindVolunteerPageModule {}
