import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { DriverTripFetch, DriverTripPlan } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-unload-dashborad',
    templateUrl: './unload-dashborad.component.html',
    styleUrls: ['./unload-dashborad.component.scss'],
})
export class UnloadDashboradComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, private languageService: LanguageService) { }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: ''
    };
    driverUserId: string = '';
    companyId: string = '';


    uiLabels: any = {
        pageHeader: "Driver Dashboard",
        dateLabel: "Trip Date",
        loadTripList: "Load Trip List",
        tripList: "Trip List",
        tripTime: "Trip Time",
        pickListButton: "Drop List",
    }

    viewContent: boolean = false;

    componentCode: string = AppConstant.COMP.UNLOAD_DRIVER_DASHBOARD;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();
        this.driverUserId = this.languageService.getUserInfoId(this.companyId);

        this.driverDashboardService.getCurrentDate().subscribe(response => {
            if (response) {
                this.tripDate.date = response.date;
            }

            this.getDriverTripPlan(this.driverUserId, this.tripDate.date);
        })
        // this.tripDate.date = this.utilService.getCurrentDate();



    }

    getDriverTripPlan(driverUserId: string, date: string) {

        var driverTripFetch: DriverTripFetch = {
            date: date,
            driverId: driverUserId
        }

        this.driverDashboardService.getDriverTrip(driverTripFetch).subscribe(data => {
            if (data) {
                this.driverTripPlan = data;
                this.driverTabsDataService.setDriverTripPlan(data);
            }
            this.viewContent = true;

        })
    }

    selectedTrip(selectedTrip: DriverTripPlan) {
        this.driverTabsDataService.setSelectedTrip(selectedTrip);

        // this.router.navigate(['/driver', { outlets: { driverOutlet: ['pick-list'] } }]);
    }

}
