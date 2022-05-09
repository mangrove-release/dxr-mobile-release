import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, TripCompletionData, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { TripCompletionCodePopupComponent } from '../trip-completion-code-popup/trip-completion-code-popup.component';

@Component({
    selector: 'app-trip-completion',
    templateUrl: './trip-completion.component.html',
    styleUrls: ['./trip-completion.component.scss'],
})
export class TripCompletionComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router, public modalController: ModalController) { }

    uiLabels: any = {
        pageHeader: "Trip Completion",
        tripInfo: "Trip Info",
        companyName: "Processor Company",
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
        comfirmUnloadButton: "Confirm Unload",
        pick: "Pick",
        projectTitle: "Project",
        wasteQuantity: "Waste Weight",
        declaredQuantity: "Net Weight",
        calculatedWasteQuantity: "Calculated Waste Quantity",
        pickQuantity: "Quantity",
        package: "Package",
        numberOfPackage: "No. of Package",
        wasteList: "Waste List",
        packageList: "Packages",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        confirmPackageWeightButton: "Confirm",
        pickStatusLoaded: "Loaded",
        pickUnloadConfirmToast: "Waste unload completed",
        scanTripCompletionQrCoe: "Scan QR",
        receivedWasteList: "Recevied Waste List",

    }

    companyId: string = this.utilService.getCompanyIdCookie();

    driverTripPlan: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    processorCompanyInfo: CompanyInfo;
    scannedTripInfo: TripQrData;
    handoverWastePickAndPackage: HandoverWastePickAndPackage;
    scannedPackgeInfo: PackageInfo[] = [];
    loadPackageView: LoadPackageView;

    viewContent = false;

    handoverPackageView: boolean = false;

    componentCode: string = AppConstant.COMP.UNLOAD_TRIP_COMPLETION;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.handoverWastePickAndPackage = this.driverTabsDataService.getTransporterHandoverData();

    }

    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.driverTripPlan = response;
            }

            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.driverTripPlan, this.scannedPackgeInfo, this.transporterCompanyInfo, this.processorCompanyInfo);
            this.handoverPackageView = true;
        });
    }

    getTransporterCompanyInfo(companyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(companyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.getProcessorCompanyInfo(this.handoverWastePickAndPackage.companyId);
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

    getHandoverPackageList(handoverWastePickAndPackage: HandoverWastePickAndPackage) {
        this.driverDashboardService.getHandoverPackageDefList(handoverWastePickAndPackage.pickIdList).subscribe(response => {
            if (response) {
                this.scannedPackgeInfo = response;
            }

            this.getTransporterCompanyInfo(this.companyId);
        });
    }

    async scanTripCompletionQrCoe() {

        const modal = await this.modalController.create({
            component: QrScannerComponent,
            componentProps: {

            }
        });

        await modal.present();

        modal.onDidDismiss().then(data => {
            if (data) {
                this.handoverWastePickAndPackage = data.data;
                this.getHandoverPackageList(this.handoverWastePickAndPackage);
            }
        });

    }

    confirmUnload() {
        this.driverDashboardService.confirmUnload(this.handoverWastePickAndPackage.pickIdList).subscribe(response => {
            if (response) {
                this.driverDashboardService.presentToast(this.uiLabels.pickUnloadConfirmToast, 3000);
                this.preparePickList(response);
            }
        })
    }

    preparePickList(unloadedPicks: PickInfo[]) {
        var unloadPicksString: string = JSON.stringify(unloadedPicks);
        this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {
            if (eachWaste) {
                eachWaste.pickList.forEach(eachPick => {
                    if (unloadPicksString.includes(eachPick.pick.pickId)) {
                        eachPick.pick.loadStatus = AppConstant.PICK_UNLOAD_STATUS;
                    }

                })
            }
        })

    }

}
