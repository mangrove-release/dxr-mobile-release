import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripFetch, DriverTripPlan } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-driver-load-op-tabs',
    templateUrl: './driver-load-op-tabs.component.html',
    styleUrls: ['./driver-load-op-tabs.component.scss'],
})
export class DriverLoadOpTabsComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, public router: Router, private languageService: LanguageService) { }

    driverTripPlan: DriverTripPlan[] = [];
    selectedIndex = 0;
    viewContent: boolean = false;

    uiLabels: any = {
        dashBoardTab: "Dashboard",
        pickListTab: "Pick List",
        packageScan: "Package Scan",
        companyName: "Current Company"
    }

    menuList: any = [];
    companyId: string = '';
    driverUserId: string = '';
    currentCompanyInfo: CompanyInfo;

    componentCode: string = AppConstant.COMP.LOAD_OP_TABS;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();
        this.driverUserId = this.languageService.getUserInfoId(this.companyId);


        this.getOwnCompanyInfo();
        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.LOAD_MENU_ID);
        this.router.navigate([this.menuList[0].parentSegment, { outlets: { driverOutlet: [this.menuList[0].menuUrl] } }]);
    }

    getOwnCompanyInfo() {

        this.driverDashboardService.getPartnerCompanyInfo(this.companyId).subscribe(response => {
            if (response) {
                this.currentCompanyInfo = response;
            }
            this.viewContent = true;
        })

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

            this.router.navigate([this.menuList[0].parentSegment, { outlets: { driverOutlet: [this.menuList[0].menuUrl] } }]);
        })
    }

    indexChange(event: any) {
        this.selectedIndex = event.index;
    }

}
