import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, PickInfo, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-waste-list',
    templateUrl: './waste-list.component.html',
    styleUrls: ['./waste-list.component.scss'],
})
export class WasteListComponent implements OnInit {

    constructor(public modalController: ModalController, private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router) { }

    selectedTrip: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    selectedPick: PickInfo;

    scannedTripInfo: TripQrData;

    tripDate: any = {
        date: ''
    };
    pickGroup: any[] = [];
    driverUserId: string = '';
    companyId: string = this.utilService.getCompanyIdCookie();
    uiLabels: any = {
        pageHeader: "Pick List",
        pickLocation: "Pick Location",
        wasteItemTitle: "Waste Item",
        quantity: "Quantity",
        pickStatus: "Pick Status",
        qrCodeButton: "QR Code",
        loaded: "Loaded",
        packageDefButton: "Package Def",
        projectTitle: "Project Title",
        tripInfo: "Trip Info",
        companyName: "Company",
        personInChargeName: "Person in Charge",
        contactNo: "Contact No",
        tripDate: "Trip Date",
        vehicleName: "Vehicle Name",
        vehicleRegNo: "Vehicle No",
        driverName: "Driver",
        driverLicenseNo: "License No",
        date: "Date",
        totalQuantity: "Total Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        pickQuantity: "Quantity",
        wasteList: "Waste List"
    }

    viewContent: boolean = false;

    componentCode: string = AppConstant.COMP.LOAD_WASTE_LIST;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.selectedTrip = this.driverTabsDataService.getScannedTripPlan();

        this.transporterCompanyInfo = this.driverTabsDataService.getTransporterCompanyInfo();

        this.scannedTripInfo = this.driverTabsDataService.getScannedTripInfo();

        if (this.selectedTrip && this.selectedTrip.pickList) {
            this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'pickLocation');

            if (this.pickGroup && Object.keys(this.pickGroup) && Object.keys(this.pickGroup).length > 0) {
                this.selectedPick = this.pickGroup[Object.keys(this.pickGroup)[0]][0];
                this.driverTabsDataService.setSelectedPickForPackageDef(this.selectedPick);
            }
        }

        this.viewContent = true;
    }

    packageDef(selectedPick: PickInfo) {

        this.selectedPick = selectedPick;
        this.driverTabsDataService.setSelectedPickForPackageDef(selectedPick);

        this.router.navigate([AppConstant.LOAD_MENU_PARENT_SEGMENT, { outlets: { driverOutlet: [AppConstant.DUMPER_PACKAGE_DEF_MENU_URL] } }]);
    }

    async close() {
        await this.modalController.dismiss();
    }

}
