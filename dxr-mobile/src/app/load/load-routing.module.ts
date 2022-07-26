import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyTripDashboardComponent } from './company-trip-dashboard/company-trip-dashboard.component';
import { DriverDashboradComponent } from './driver-dashborad/driver-dashborad.component';
import { DriverLoadOpTabsComponent } from './driver-load-op-tabs/driver-load-op-tabs.component';

import { HandoverComponent } from './handover/handover.component';
import { PackageDefComponent } from './package-def/package-def.component';
import { PackageScanComponent } from './package-scan/package-scan.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { TripScanComponent } from './trip-scan/trip-scan.component';
import { WasteListComponent } from './waste-list/waste-list.component';

const routes: Routes = [
    {
        path: '',
        component: DriverLoadOpTabsComponent,
        children: [
            {
                path: 'driver-dashboard',
                component: DriverDashboradComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'driver-pick-list',
                component: PickListComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'driver-waste-load',
                component: PackageScanComponent,
                outlet: 'driverOutlet'
            },
            // {
            //     path: 'dumper-trip-scan',
            //     component: TripScanComponent,
            //     outlet: 'driverOutlet'
            // },
            {
                path: 'dumper-trip-scan',
                component: CompanyTripDashboardComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'dumper-scanned-waste',
                component: WasteListComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'dumper-package-def',
                component: PackageDefComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'dumper-handover',
                component: HandoverComponent,
                outlet: 'driverOutlet'
            },
            {
                path: 'company-trip-dashboard',
                component: CompanyTripDashboardComponent,
                outlet: 'driverOutlet'
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoadPageRoutingModule { }
