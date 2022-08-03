import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-dumper-handover-op-tabs',
    templateUrl: './dumper-handover-op-tabs.component.html',
    styleUrls: ['./dumper-handover-op-tabs.component.scss'],
})
export class DumperHandoverOpTabsComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, public modalController: ModalController) { }

    uiLabels: any = {
        tripScanTab: "Trip Scan",
        tripVerifyTab: "Trip Verify",
        packageDefTab: "Package Def",
        handoverTab: "Handover"
    }

    viewContent = false;

    componentCode: string = AppConstant.COMP.ADD_FAQ_CATEGORY_ADMIN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.router.navigate(['/load', { outlets: { dumperOutlet: ['dumper-trip-scan'] } }]);
    }



}
