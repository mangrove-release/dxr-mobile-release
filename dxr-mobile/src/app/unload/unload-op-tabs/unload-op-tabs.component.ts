import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-unload-op-tabs',
    templateUrl: './unload-op-tabs.component.html',
    styleUrls: ['./unload-op-tabs.component.scss'],
})
export class UnloadOpTabsComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, public router: Router, private languageService: LanguageService) { }

    uiLabels: any = {
        companyName: "Current Company"
    }
    menuList: any = [];
    companyId: string = '';
    userId: string = '';
    userName: string = '';
    driverTripPlan: DriverTripPlan[] = [];
    selectedIndex = 0;
    viewContent: boolean = false;

    currentCompanyInfo: CompanyInfo;

    componentCode: string = AppConstant.COMP.UNLOAD_OP_TABS;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();
        this.userId = this.languageService.getUserInfoId(this.companyId);
        this.userName = this.languageService.getUserName(this.companyId);

        this.getOwnCompanyInfo();

        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.UNLOAD_MENU_ID);

        this.router.navigate([this.menuList[0].parentSegment, { outlets: { unloadOutlet: [this.menuList[0].menuUrl] } }]);
    }


    getOwnCompanyInfo() {
        this.driverDashboardService.getPartnerCompanyInfo(this.companyId).subscribe(response => {
            if (response) {
                this.currentCompanyInfo = response;
            }
            this.viewContent = true;
        })
    }


}
