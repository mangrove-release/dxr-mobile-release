import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnloadPageRoutingModule } from './unload-routing.module';

import { UnloadPage } from './unload.page';
import { UnloadOpTabsComponent } from './unload-op-tabs/unload-op-tabs.component';
import { UnloadTripScanComponent } from './unload-trip-scan/unload-trip-scan.component';
import { VerificationComponent } from './verification/verification.component';
import { WeightDeclareComponent } from './weight-declare/weight-declare.component';
import { ProcessorReceiveComponent } from './processor-receive/processor-receive.component';
import { UnloadDashboradComponent } from './unload-dashborad/unload-dashborad.component';
import { DriverHandoverComponent } from './driver-handover/driver-handover.component';
import { TripCompletionComponent } from './trip-completion/trip-completion.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TripCompletionCodePopupComponent } from './trip-completion-code-popup/trip-completion-code-popup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UnloadPageRoutingModule,
        CommonDirectivesModule,
        NgxQRCodeModule,
        ZXingScannerModule,
    ],
    declarations: [
        UnloadPage,
        UnloadOpTabsComponent,
        UnloadTripScanComponent,
        VerificationComponent,
        WeightDeclareComponent,
        ProcessorReceiveComponent,
        UnloadDashboradComponent,
        DriverHandoverComponent,
        TripCompletionComponent,
        TripCompletionCodePopupComponent
    ],
    exports: [
        UnloadPage,
        UnloadOpTabsComponent,
        UnloadTripScanComponent,
        VerificationComponent,
        WeightDeclareComponent,
        ProcessorReceiveComponent,
        UnloadDashboradComponent,
        DriverHandoverComponent,
        TripCompletionComponent,
        TripCompletionCodePopupComponent

    ],
    entryComponents: [UnloadOpTabsComponent]
})
export class UnloadPageModule { }
