import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, TripQrData, WeightCertificateInfo, WeightCertificateReportData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-unload-trip-scan',
    templateUrl: './unload-trip-scan.component.html',
    styleUrls: ['./unload-trip-scan.component.scss'],
})
export class UnloadTripScanComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router, public modalController: ModalController) { }

    uiLabels: any = {
        pageHeader: "Waste Unload Operation",
        openScannerButton: "Open Scanner",
        tripInfo: "Trip Info",
        companyName: "Company",
        personInChargeName: "Person in Charge",
        contactNo: "Contact No",
        dropLocation: "Drop Location",
        tripDate: "Trip Date",
        vehicleName: "Vehicle Name",
        vehicleRegNo: "Vehicle No",
        driverName: "Driver",
        driverLicenseNo: "License No",
        date: "Date",
        wasteItemTitle: "Waste Item",
        totalQuantity: "Total Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        projectTitle: "Project",
        pickQuantity: "Quantity",
        verifyPackageButton: "Verify Package"
    }

    companyId: string = this.utilService.getCompanyIdCookie();

    driverTripPlan: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    processorCompanyInfo: CompanyInfo;
    scannedTripInfo: TripQrData;
    handoverWastePickAndPackage: HandoverWastePickAndPackage;

    viewContent = false;

    componentCode: string = AppConstant.COMP.UNLOAD_TRIP_SCAN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {
        this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    async openScanner() {
        const modal = await this.modalController.create({
            component: QrScannerComponent,
            componentProps: {
                // companyContext: currentContextInfo,
                // companyContextList: contextList
            }
        });

        await modal.present();

        modal.onDidDismiss().then(data => {
            if (data) {
                this.handoverWastePickAndPackage = data.data;
                this.driverTabsDataService.setTransporterHandoverData(data.data);
                this.getTransporterCompanyInfo(data.data);
            }
        });
    }

    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.driverTripPlan = response;
            }

            this.getWeightCertificateInfo(handoverWastePickAndPackage.pickIdList);
        });
    }

    getTransporterCompanyInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getPartnerCompanyInfo(handoverWastePickAndPackage.companyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.getProcessorCompanyInfo(this.companyId);
        });
    }

    getProcessorCompanyInfo(companyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(companyId).subscribe(response => {
            if (response) {
                this.processorCompanyInfo = response;
            }
            this.getTripInfo(this.handoverWastePickAndPackage);

        });
    }

    verifyUnloadPackage() {
        this.router.navigate([AppConstant.UNLOAD_MENU_PARENT_SEGMENT, { outlets: { unloadOutlet: [AppConstant.VERIFY_PACKAGE_MENU_URL] } }]);
    }

    routeToWeightDeclare() {
        this.router.navigate([AppConstant.UNLOAD_MENU_PARENT_SEGMENT, { outlets: { unloadOutlet: [AppConstant.WEIGHT_DECLARE_MENU_URL] } }]);
    }

    getWeightCertificateInfo(pickIdList: string[]) {

        this.driverDashboardService.getWeightCertificateInfo(pickIdList).subscribe(response => {

            if (response) {
                this.driverTabsDataService.setWeightCertificateInfo(response);
            }
        });
    }

    generateWeightCertificate() {

        var componentCode: string = AppConstant.COMP.UNLOAD_WEIGHT_DECLARE;
        var weightCertificateLabel: any = this.languageService.getUiLabels(componentCode, AppConstant.UI_LABEL_TEXT);

        var weightCertificateInfo: WeightCertificateInfo = this.driverTabsDataService.getWeightCertificateInfo();

        if (weightCertificateInfo && weightCertificateInfo.weightCertificateInfoId) {
            var weightCertificateData: WeightCertificateReportData = this.driverDashboardService.prepareWeightCertificateData(weightCertificateInfo, weightCertificateLabel);

            this.driverDashboardService.generateReport(weightCertificateData);
        } else {
            this.utilService.showSnackbar(weightCertificateLabel.certificateDataNotFoundToast, 3000);
        }
    }

}
