import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenonPage } from './venon.page';

const routes: Routes = [
  {
    path: '',
    component: VenonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenonPageRoutingModule {}
