import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, PackageInfo, PickInfo, PickWisePackage, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { HandoverCodeComponent } from '../handover-code/handover-code.component';

@Component({
    selector: 'app-handover',
    templateUrl: './handover.component.html',
    styleUrls: ['./handover.component.scss'],
})
export class HandoverComponent implements OnInit {

    constructor(public modalController: ModalController, private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, private languageService: LanguageService) { }

    uiLabels: any = {
        pageHeader: "Handover",
        generateQrCode: "Generate QR Code",
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
        wasteList: "Waste List",
        packageList: "Package List",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
    }

    selectedTrip: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    selectedPick: PickInfo;
    scannedTripInfo: TripQrData;

    pickGroup: any[] = [];
    driverUserId: string = '';
    companyId: string = this.utilService.getCompanyIdCookie();

    allPackageDef: PackageInfo[] = [];

    pickWisePackageList: PickWisePackage[] = [];

    componentCode: string = AppConstant.COMP.LOAD_HANDOVER;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    hidePackageDefInfo = AppConstant.HIDE_PACKAGE_DEF_INFO;

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.selectedTrip = this.driverTabsDataService.getScannedTripPlan();

        this.transporterCompanyInfo = this.driverTabsDataService.getTransporterCompanyInfo();

        this.scannedTripInfo = this.driverTabsDataService.getScannedTripInfo();

        if (this.selectedTrip && this.selectedTrip.pickList) {
            this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'pickLocation');

            // if (this.pickGroup && Object.keys(this.pickGroup) && Object.keys(this.pickGroup).length > 0) {

            //     this.selectedPick = this.pickGroup[this.scannedTripInfo.pickLocation.split(", ")[1]];
            //     this.driverTabsDataService.setSelectedPickForPackageDef(this.selectedPick);
            // }
        }

        // this.allPackageDef = this.driverTabsDataService.getAllPackageDef();

        this.driverDashboardService.getTripPackageDefList(this.selectedTrip.tripInfoId).subscribe(response => {
            if (response) {
                this.allPackageDef = response;
                this.pickWisePackageList = this.prepareHandoverPackageList(this.selectedTrip.pickList, this.allPackageDef, this.scannedTripInfo.pickLocation);
            }
        })


    }

    prepareHandoverPackageList(pickList: PickInfo[], packageList: PackageInfo[], pickLocation: string) {

        var pickWisePackageList: PickWisePackage[] = [];

        pickList.forEach(eachPick => {
            var pickPackages: PackageInfo[] = packageList.filter(item => item.pickId == eachPick.pickId && pickLocation.includes(eachPick.disposalInfo.pickZipCode) && pickLocation.includes(eachPick.disposalInfo.pickLocation));

            if (pickPackages && pickPackages.length > 0) {
                var pickWisePackage: PickWisePackage = {
                    pick: eachPick,
                    packageList: pickPackages,
                    calculatedQunatity: eachPick.quantity
                }
                pickWisePackageList.push(pickWisePackage);
            }
        });

        return pickWisePackageList;
    }


    async generateHandoverQrCode() {
        var handoverPickList: HandoverWastePickAndPackage = this.driverDashboardService.generateWasteHandoverQrCode(this.pickWisePackageList, this.selectedTrip.tripInfoId, this.companyId);

        const modal = await this.modalController.create({
            component: HandoverCodeComponent,
            componentProps: {
                handoverPickList: handoverPickList,

            }
        });

        return await modal.present();

    }

}
