import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverDashboradComponent } from './driver-dashborad/driver-dashborad.component';
import { DriverLoadOpTabsComponent } from './driver-load-op-tabs/driver-load-op-tabs.component';

import { PickListComponent } from './pick-list/pick-list.component';
import { PackageScanComponent } from './package-scan/package-scan.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { PickCodeComponent } from './pick-code/pick-code.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HandoverComponent } from './handover/handover.component';
import { PackageDefComponent } from './package-def/package-def.component';
import { TripScanComponent } from './trip-scan/trip-scan.component';
import { WasteListComponent } from './waste-list/waste-list.component';
import { HandoverCodeComponent } from './handover-code/handover-code.component';
import { LoadPage } from './load.page';
import { LoadPageRoutingModule } from './load-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoadPageRoutingModule,
        CommonDirectivesModule,
        NgxQRCodeModule,
        ZXingScannerModule,

    ],
    declarations: [
        DriverDashboradComponent,
        DriverLoadOpTabsComponent,
        PickListComponent,
        PackageScanComponent,
        PickCodeComponent,
        TripScanComponent,
        PackageDefComponent,
        HandoverComponent,
        WasteListComponent,
        HandoverCodeComponent,
        LoadPage
    ],
    exports: [
        DriverDashboradComponent,
        DriverLoadOpTabsComponent,
        PickListComponent,
        PackageScanComponent,
        PickCodeComponent,
        TripScanComponent,
        PackageDefComponent,
        HandoverComponent,
        WasteListComponent,
        HandoverCodeComponent,
        LoadPage
    ],
    entryComponents: [DriverLoadOpTabsComponent]
})
export class LoadPageModule { }
