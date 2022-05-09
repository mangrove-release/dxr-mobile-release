import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DumperHandoverOpTabsComponent } from './dumper-handover-op-tabs/dumper-handover-op-tabs.component';

const routes: Routes = [
    {
        path: '',
        component: DumperHandoverOpTabsComponent,
        children: [
            // {
            //     path: 'dumper-trip-scan',
            //     component: TripScanComponent,
            //     outlet: 'driverOutlet'
            // },
            // {
            //     path: 'dumper-scanned-waste',
            //     component: TripVerificationComponent,
            //     outlet: 'driverOutlet'
            // },
            // {
            //     path: 'dumper-package-def',
            //     component: PackageDefComponent,
            //     outlet: 'driverOutlet'
            // },
            // {
            //     path: 'dumper-handover',
            //     component: HandoverComponent,
            //     outlet: 'driverOutlet'
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DumperPageRoutingModule { }
