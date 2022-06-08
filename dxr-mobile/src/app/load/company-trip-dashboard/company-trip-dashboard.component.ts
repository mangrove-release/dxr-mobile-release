import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, CompanyTripFetch, DriverTripFetch, DriverTripPlan, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-company-trip-dashboard',
    templateUrl: './company-trip-dashboard.component.html',
    styleUrls: ['./company-trip-dashboard.component.scss'],
})
export class CompanyTripDashboardComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, private languageService: LanguageService, public modalController: ModalController) { }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: this.utilService.getCurrentDate()
    };
    driverUserId: string = '';
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
        this.driverUserId = this.languageService.getUserInfoId(this.companyId);

        this.getOwnCompanyInfo();

        this.driverDashboardService.getCurrentDate().subscribe(response => {
            if (response) {
                this.tripDate.date = response.date;

            }

            this.getDriverTripPlan(this.driverUserId, this.tripDate.date);
        });
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
                console.log(JSON.stringify(data));
            }
            this.viewContent = true;

        })
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

    async loadPick(selectedTrip: DriverTripPlan, selectedPickIndex: number) {
        var qrData: TripQrData = {
            tripInfoId: selectedTrip.tripInfoId,
            pickLocation: selectedTrip.pickList[selectedPickIndex].disposalInfo.pickZipCode + ', ' + selectedTrip.pickList[selectedPickIndex].disposalInfo.pickLocation,
            driverCompanyId: selectedTrip.vehicleInfo.companyId,
            driverId: selectedTrip.driverId,
        }
        await this.modalController.dismiss(qrData);
    }

}
