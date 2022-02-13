import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowNearbyRoutesPage } from './show-nearby-routes.page';

const routes: Routes = [
  {
    path: '',
    component: ShowNearbyRoutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowNearbyRoutesPageRoutingModule {}
