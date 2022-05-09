import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorServicesRoutingModule } from './visitor-services-routing.module';
import { VisitorServicesComponent } from './visitor-services.component';

@NgModule({
    declarations: [
        VisitorServicesComponent,
    ],
    imports: [
        CommonModule,
        VisitorServicesRoutingModule,
    ],
    exports: [
    ]
})
export class VisitorServicesModule { }
