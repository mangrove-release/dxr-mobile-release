import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-company-name-header',
    templateUrl: './company-name-header.component.html',
    styleUrls: ['./company-name-header.component.scss'],
})
export class CompanyNameHeaderComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, public router: Router, private languageService: LanguageService) { }

    uiLabels: any = {
        companyName: "Current Company"
    }

    companyId: string = '';

    viewContent: boolean = false;

    currentCompanyInfo: CompanyInfo;

    componentCode: string = AppConstant.COMP.COMPANY_NAME_HEADER_COMP;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {
        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();

        this.getOwnCompanyInfo();
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
