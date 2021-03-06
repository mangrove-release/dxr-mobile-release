import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, CompanyTripFetch, DriverTripFetch, DriverTripPlan, HandoverWastePickAndPackage, PackageInfo, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { HandoverCodeComponent } from '../handover-code/handover-code.component';
import { PickCodeComponent } from '../pick-code/pick-code.component';
import { WasteListComponent } from '../waste-list/waste-list.component';

@Component({
    selector: 'app-company-trip-dashboard',
    templateUrl: './company-trip-dashboard.component.html',
    styleUrls: ['./company-trip-dashboard.component.scss'],
})
export class CompanyTripDashboardComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, private languageService: LanguageService, public modalController: ModalController, private routerOutlet: IonRouterOutlet) { }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: this.utilService.getCurrentDate()
    };
    loggedUserId: string = '';
    companyId: string = '';
    currentCompanyInfo: CompanyInfo;


    uiLabels: any = {
        pageHeader: "Trip Dashboard",
        dateLabel: "Trip Date",
        loadTripList: "Load Trip List",
        tripList: "Trip List",
        tripTime: "Trip Time",
        pickListButton: "Pick List",
        driverName: "Driver Name",
        projectTitle: "Project Title",
        pick: "Pick",
        pickQuantity: "Quantity",
        pickStatusLoaded: "Loaded",
        loadButton: "Load"
    }
    viewContent: boolean = false;

    componentCode: string = AppConstant.COMP.COMPANY_TRIP_LIST_DASHBOARD;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.companyId = this.utilService.getCompanyIdCookie();
        this.loggedUserId = this.languageService.getUserInfoId(this.companyId);

        this.getOwnCompanyInfo();

        var redirectUserInfo = this.driverTabsDataService.getRedirectUserInfo();
        if (redirectUserInfo) {
            this.tripDate.date = redirectUserInfo.selectedDate;
            this.getDriverTripPlan(this.loggedUserId, this.tripDate.date);
        } else {
            this.driverDashboardService.getCurrentDate().subscribe(response => {
                if (response) {
                    this.tripDate.date = response.date;

                }

                this.getDriverTripPlan(this.loggedUserId, this.tripDate.date);
            });
        }
    }

    getOwnCompanyInfo() {
        this.driverDashboardService.getPartnerCompanyInfo(this.companyId).subscribe(response => {
            if (response) {
                this.currentCompanyInfo = response;
            }
            this.viewContent = true;
        })
    }

    getDriverTripPlan(companyId: string, date: string) {

        var driverTripFetch: CompanyTripFetch = {
            date: date,
            companyId: this.companyId
        }

        this.driverDashboardService.getCompanyTrip(driverTripFetch).subscribe(data => {
            if (data) {
                this.driverTripPlan = data;
                this.driverTabsDataService.setDriverTripPlan(data);
                this.prepareTripPlanView();
            }


        })
    }

    prepareTripPlanView() {

        this.driverTripPlan.forEach(eachTrip => {
            var pickGroup: any = this.driverDashboardService.groupBy(eachTrip.pickList, 'pickLocation');

            eachTrip.pickGroup = pickGroup;

        });

        this.viewContent = true;
    }

    selectedTrip(selectedTrip: DriverTripPlan) {
        this.driverTabsDataService.setSelectedTrip(selectedTrip);

        // var tripQrData:TripQrData =  {
        //     tripInfoId: selectedTrip.tripInfoId,
        //     pickLocation: selectedTrip.pickList,
        //     driverCompanyId: string,
        //     driverId: string,
        // }

        // this.router.navigate(['/driver', { outlets: { driverOutlet: ['pick-list'] } }]);
    }

    generateHandoverQrCode(selectedTrip: DriverTripPlan, selectedPickGroupValue: any[]) {

        this.addPacakgeDef(selectedTrip, async () => {
            var handoverPickList: HandoverWastePickAndPackage = this.driverDashboardService.generateWasteHandoverQrCodeFromPickList(selectedPickGroupValue, selectedTrip.tripInfoId, this.companyId);

            const modal = await this.modalController.create({
                component: HandoverCodeComponent,
                componentProps: {
                    handoverPickList: handoverPickList,

                }
            });

            return await modal.present();
        })


    }

    addPacakgeDef(selectedTrip: DriverTripPlan, callBack: any) {

        if (selectedTrip && selectedTrip.tripInfoId && selectedTrip.pickList) {
            var asynCallCount = 0;
            selectedTrip.pickList.forEach(eachPick => {
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
                        asynCallCount++;

                        if (asynCallCount == selectedTrip.pickList.length) {
                            callBack();
                        }
                        // this.addPackageDef(Object.assign({}, response));
                        // this.resetForm();
                    }
                });
            });
        }

    }

    async loadPick(selectedTrip: DriverTripPlan, selectedPickIndex: number) {
        var qrData: TripQrData = {
            tripInfoId: selectedTrip.tripInfoId,
            pickLocation: selectedTrip.pickList[selectedPickIndex].disposalInfo.pickZipCode + ', ' + selectedTrip.pickList[selectedPickIndex].disposalInfo.pickLocation,
            driverCompanyId: selectedTrip.vehicleInfo.companyId,
            driverId: selectedTrip.driverId,
        }
        await this.modalController.dismiss(qrData);
    }

    showPickDetail(selectedTrip: DriverTripPlan, selectedPickIndex: number) {
        var qrData: TripQrData = {
            tripInfoId: selectedTrip.tripInfoId,
            pickLocation: selectedTrip.pickList[selectedPickIndex].disposalInfo.pickZipCode + ', ' + selectedTrip.pickList[selectedPickIndex].disposalInfo.pickLocation,
            driverCompanyId: selectedTrip.vehicleInfo.companyId,
            driverId: selectedTrip.driverId,
        }

        this.driverTabsDataService.setScannedTripInfo(qrData);
        this.driverTabsDataService.setDumperScannedTripId(qrData.tripInfoId);


        this.getTripInfo(qrData, () => {
            this.openPickDetailPopup();
        })
    }

    async openPickDetailPopup() {
        const modal = await this.modalController.create({
            component: WasteListComponent,
            componentProps: {

            },
            swipeToClose: true,
            animated: true,
            presentingElement: this.routerOutlet.nativeEl
        });

        await modal.present();
    }

    getTripInfo(data: TripQrData, callBack: any) {
        this.driverDashboardService.getTripInfo(data.tripInfoId).subscribe(response => {
            if (response) {
                this.driverTabsDataService.setScannedTripPlan(response);
                this.getTransporterCompanyInfo(data.driverCompanyId, callBack);
            }
        });
    }

    getTransporterCompanyInfo(tranporterCompanyId: string, callBack: any) {
        this.driverDashboardService.getPartnerCompanyInfo(tranporterCompanyId).subscribe(response => {
            if (response) {
                this.driverTabsDataService.setTransporterCompanyInfo(response);
                callBack();
            }
        });
    }

}
