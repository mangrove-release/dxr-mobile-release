import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonDirectivesComponent } from './common-directives.component';

const routes: Routes = [{ path: '', component: CommonDirectivesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonDirectivesRoutingModule { }
