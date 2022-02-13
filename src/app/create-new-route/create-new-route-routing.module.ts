import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewRouteComponent } from './create-new-route.component';

const routes: Routes = [
  {
    path: '',
    component: CreateNewRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewRouteRoutingModule {}
