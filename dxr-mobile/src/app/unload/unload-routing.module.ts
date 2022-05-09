import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverHandoverComponent } from './driver-handover/driver-handover.component';
import { ProcessorReceiveComponent } from './processor-receive/processor-receive.component';
import { TripCompletionComponent } from './trip-completion/trip-completion.component';
import { UnloadDashboradComponent } from './unload-dashborad/unload-dashborad.component';
import { UnloadOpTabsComponent } from './unload-op-tabs/unload-op-tabs.component';
import { UnloadTripScanComponent } from './unload-trip-scan/unload-trip-scan.component';
import { VerificationComponent } from './verification/verification.component';
import { WeightDeclareComponent } from './weight-declare/weight-declare.component';

const routes: Routes = [
    {
        path: '',
        component: UnloadOpTabsComponent,
        children: [
            {
                path: 'driver-dashboard',
                component: UnloadDashboradComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'driver-handover',
                component: DriverHandoverComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'driver-trip-completion',
                component: TripCompletionComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'processor-trip-scan',
                component: UnloadTripScanComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'processor-trip-verify',
                component: VerificationComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'processor-weight-dclr',
                component: WeightDeclareComponent,
                outlet: 'unloadOutlet'
            },
            {
                path: 'processor-waste-receive',
                component: ProcessorReceiveComponent,
                outlet: 'unloadOutlet'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UnloadPageRoutingModule { }
