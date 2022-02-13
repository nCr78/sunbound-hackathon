import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindNewRouteComponent } from './find-new-route.component';

const routes: Routes = [
  {
    path: '',
    component: FindNewRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindNewRouteRoutingModule {}
