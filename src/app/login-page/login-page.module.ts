import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {}
