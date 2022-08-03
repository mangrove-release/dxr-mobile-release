import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, PackageInfo, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CompanyTripDashboardComponent } from '../company-trip-dashboard/company-trip-dashboard.component';

@Component({
    selector: 'app-trip-scan',
    templateUrl: './trip-scan.component.html',
    styleUrls: ['./trip-scan.component.scss'],
})
export class TripScanComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router, public modalController: ModalController, private routerOutlet: IonRouterOutlet, private activatedroute: ActivatedRoute) { }

    uiLabels: any = {
        pageHeader: "Trip Scan",
        openScannerButton: "Open Scanner",
        tripInfo: "Trip Info",
        companyName: "Company",
        personInChargeName: "Person in Charge",
        contactNo: "Contact No",
        pickLocation: "Pick Location",
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
        wasteList: "Waste List",
        tripListButton: "Trip List",
        handOverButton: "Handover",
    }

    driverTripPlan: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    scannedTripInfo: TripQrData = {} as TripQrData;

    viewContent = false;

    componentCode: string = AppConstant.COMP.LOAD_TRIP_SCAN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {


        var redirectTripInfo: TripQrData = this.driverTabsDataService.getScannedTripInfo();

        if (redirectTripInfo) {
            this.driverDashboardService.getTripInfo(redirectTripInfo.tripInfoId).subscribe(response => {
                if (response) {
                    this.driverTripPlan = response;
                    this.driverTabsDataService.setScannedTripPlan(response);
                }

                this.driverDashboardService.getPartnerCompanyInfo(redirectTripInfo.driverCompanyId).subscribe(response => {
                    if (response) {
                        this.transporterCompanyInfo = response;
                        this.driverTabsDataService.setTransporterCompanyInfo(response);
                    }
                });

            });

            // this.prepareScannedTripInfo(redirectTripInfo);
        }

        // this.activatedroute.paramMap.subscribe(params => {
        //     var tripInfoId = params.get('tripId') ? params.get('tripId') : null;

        //     if (tripInfoId) {
        //         this.scannedTripInfo = {
        //             tripInfoId: tripInfoId,
        //             pickLocation: '',
        //             driverCompanyId: '',
        //             driverId: '',
        //         }
        //     }
        // });

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        // this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }

    handOverButton() {
        this.router.navigate([AppConstant.LOAD_MENU_PARENT_SEGMENT, { outlets: { driverOutlet: [AppConstant.DUMPER_HANDOVER_MENU_URL] } }]);
    }

    addPacakgeDef() {

        if (this.driverTripPlan && this.driverTripPlan.tripInfoId && this.driverTripPlan.pickList) {
            this.driverTripPlan.pickList.forEach(eachPick => {
                var newPackage: PackageInfo = {} as PackageInfo;
                var newId = this.utilService.generateUniqueId();
                newPackage.packageId = newId;

                newPackage.pickId = eachPick.pickId;
                newPackage.disposeId = eachPick.disposalInfo.disposalInfoId;
                newPackage.tripId = eachPick.tripId;

                newPackage.size = 0;
                newPackage.numberOfPackage = 0;
                newPackage.isLumpsum = AppConstant.TRUE_STATEMENT;
                newPackage.quantity = eachPick.quantity;

                this.driverDashboardService.savePackageDef(newPackage).subscribe(response => {
                    if (response) {
                        // this.addPackageDef(Object.assign({}, response));
                        // this.resetForm();
                    }
                });
            });
        }

    }

    async showCompanyTripList() {
        const modal = await this.modalController.create({
            component: CompanyTripDashboardComponent,
            componentProps: {

            },
            swipeToClose: true,
            animated: true,
            presentingElement: this.routerOutlet.nativeEl
        });

        await modal.present();

        modal.onDidDismiss().then((data: any) => {
            if (data.data) {

                this.prepareScannedTripInfo(data.data);
            }
        });
    }

    async openScanner() {

        const modal = await this.modalController.create({
            component: QrScannerComponent,
            componentProps: {

            },
            swipeToClose: true,
            animated: true,
            presentingElement: this.routerOutlet.nativeEl
        });

        await modal.present();

        modal.onDidDismiss().then((data: any) => {
            if (data.data) {

                this.prepareScannedTripInfo(data.data);
            }
        });
    }



    prepareScannedTripInfo(data: TripQrData) {

        this.scannedTripInfo = data;
        var tripInfoId = data.tripInfoId;
        var pickLocation = data.pickLocation;

        this.driverTabsDataService.setScannedTripInfo(data);
        this.driverTabsDataService.setDumperScannedTripId(tripInfoId);

        this.getTransporterCompanyInfo(data);

    }

    getTripInfo(data: TripQrData) {

        this.driverDashboardService.getTripInfo(data.tripInfoId).subscribe(response => {
            if (response) {
                this.driverTripPlan = response;
                this.driverTabsDataService.setScannedTripPlan(response);
            }
            this.viewContent = true;

            this.addPacakgeDef();

        });
    }

    getTransporterCompanyInfo(data: TripQrData) {
        this.driverDashboardService.getPartnerCompanyInfo(data.driverCompanyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
                this.driverTabsDataService.setTransporterCompanyInfo(response);
            }

            this.getTripInfo(data);

        });
    }

    showWastePickList() {

        this.router.navigate([AppConstant.LOAD_MENU_PARENT_SEGMENT, { outlets: { driverOutlet: [AppConstant.DUMPER_WASTE_LIST_MENU_URL] } }]);
    }
}
