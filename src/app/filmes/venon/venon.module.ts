import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenonPageRoutingModule } from './venon-routing.module';

import { VenonPage } from './venon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenonPageRoutingModule
  ],
  declarations: [VenonPage]
})
export class VenonPageModule {}
