import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorServicesComponent } from './visitor-services.component';

const routes: Routes = [{ path: '', component: VisitorServicesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitorServicesRoutingModule { }
