import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyContext } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

export interface SwitchContextComponentData {
    companyContext: CompanyContext;
    companyContextList: CompanyContext[];
}

@Component({
    selector: 'app-switch-context',
    templateUrl: './switch-context.component.html',
    styleUrls: ['./switch-context.component.scss']
})
export class SwitchContextComponent implements OnInit {

    constructor(private modalController: ModalController, private navParams: NavParams, private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {

        // currentCompanyLabel: 'Current Context',
        // switchToCompanyLabel: 'Switch To',
        // switchButton: 'Switch',
        // closeButton: 'Close'

    }

    companyContextList: CompanyContext[] = [];
    selectedItem: CompanyContext = {} as CompanyContext;
    currentCompany: CompanyContext = {} as CompanyContext;
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SWITCH_COMPANY;

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SWITCH_COMPANY, AppConstant.UI_LABEL_TEXT);
        if (this.navParams.data) {
            this.currentCompany = this.navParams.data.companyContext;
            this.companyContextList = this.navParams.data.companyContextList;
            this.selectedItem = this.navParams.data.companyContext;
            this.viewContent = true;
        }
        // this.selectedItem = 


    }

    switchContext() {
        if (this.selectedItem) {
            if (confirm('Page will reload').valueOf()) {
                this.utilService.setCompanyIdCookie(this.selectedItem.companyId);
                // this.cookieService.set(AppConstant.LANG_INDEX_KEY, this.selectedLanguage);
                // this.selectedLanguage = Object.assign('', this.selectedLanguageModel);
                window.location.assign('/');
            } else {
                // this.selectedLanguage = (this.selectedLanguage == this.languageArray[0]) ? this.languageArray[1] : this.languageArray[0];
            }


        }
    }


    selectListItem(item: CompanyContext) {
        this.selectedItem = item;
    }

    async closeModal() {

        await this.modalController.dismiss();
    }
}
