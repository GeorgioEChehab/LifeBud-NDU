import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AveragePageRoutingModule } from './average-routing.module';

import { AveragePage } from './average.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AveragePageRoutingModule
  ],
  declarations: [AveragePage]
})
export class AveragePageModule {}
