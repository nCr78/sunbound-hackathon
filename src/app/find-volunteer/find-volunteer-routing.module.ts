import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindVolunteerPage } from './find-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: FindVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindVolunteerPageRoutingModule {}
