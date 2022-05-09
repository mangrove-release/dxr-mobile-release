import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';


@NgModule({
  declarations: [
    ModelsComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule
  ]
})
export class ModelsModule { }
