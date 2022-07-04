import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, public modalController: ModalController, private languageService: LanguageService) { }

    uiLabels: any = {
        pageHeader: "Verify Waste Package",
        tripPackageInfo: "Trip Package Info",
        processorCompanyName: "Processor Company",
        transporterCompanyName: "Transporter Company",
        date: "Date",
        vehicleName: "Vehicle",
        driverName: "Driver",
        wasteItemTitle: "Waste Item",
        wasteQuantity: "Waste Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        projectTitle: "Project",
        pickQuantity: "Quantity",
        package: "Package",
        numberOfPackage: "No. of Package",
        wasteList: "Waste List",
        packageList: "Packages",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        weightDeclareButton: "Declare Weight",
        pickStatusLoaded: "Loaded"
    }

    companyId: string = this.utilService.getCompanyIdCookie();
    driverUserInfoId: string = this.languageService.getUserInfoId(this.companyId);
    driverName: string = this.languageService.getUserName(this.companyId);

    transporterCompanyInfo: CompanyInfo = {} as CompanyInfo;
    processorCompanyInfo: CompanyInfo = {} as CompanyInfo;

    handoverWastePickAndPackage: HandoverWastePickAndPackage;

    scannedPackgeInfo: PackageInfo[] = [];

    selectedTrip: DriverTripPlan;

    loadPackageView: LoadPackageView = {} as LoadPackageView;

    viewContent: boolean = false;
    handoverPackageView: boolean = false;


    componentCode: string = AppConstant.COMP.UNLOAD_VERIFICATION;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    hidePackageDefInfo = AppConstant.HIDE_PACKAGE_DEF_INFO;

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.handoverWastePickAndPackage = this.driverTabsDataService.getTransporterHandoverData();
        if (this.handoverWastePickAndPackage) {
            this.getTripInfo(this.handoverWastePickAndPackage);
        }

    }

    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.selectedTrip = response;
            }

            this.getHandoverPackageList(handoverWastePickAndPackage);
        });
    }

    getHandoverPackageList(handoverWastePickAndPackage: HandoverWastePickAndPackage) {
        this.driverDashboardService.getHandoverPackageDefList(handoverWastePickAndPackage.pickIdList).subscribe(response => {
            if (response) {
                this.scannedPackgeInfo = response;
            }

            this.getTransporterCompanyInfo(handoverWastePickAndPackage);
        });
    }

    getProcessorCompanyInfo(companyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(companyId).subscribe(response => {
            if (response) {
                this.processorCompanyInfo = response;
            }
            this.viewContent = true;
        });
    }


    getTransporterCompanyInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getPartnerCompanyInfo(handoverWastePickAndPackage.companyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.getProcessorCompanyInfo(this.companyId);
            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, this.processorCompanyInfo);
            this.handoverPackageView = true;

        })

    }



    // get sum(pickList: PickInfo[]) {
    //     return pickList.map(t => t.quantity).reduce((a, b) => a + b, 0);
    // }

    routeToWeightDeclare() {
        this.router.navigate([AppConstant.UNLOAD_MENU_PARENT_SEGMENT, { outlets: { unloadOutlet: [AppConstant.WEIGHT_DECLARE_MENU_URL] } }]);
    }
}
