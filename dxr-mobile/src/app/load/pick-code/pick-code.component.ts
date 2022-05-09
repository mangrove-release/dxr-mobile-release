import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-pick-code',
    templateUrl: './pick-code.component.html',
    styleUrls: ['./pick-code.component.scss'],
})
export class PickCodeComponent implements OnInit {

    constructor(private modalController: ModalController, private navParams: NavParams, private utilService: UtilService, private languageService: LanguageService) { }

    createdCode: string = '';

    uiLabels: any = {
        pageHeader: "Pick QR Code",
        closeButton: "Close"
    }

    componentCode: string = AppConstant.COMP.LOAD_PICK_CODE;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.createdCode = JSON.stringify(this.navParams.data.qrData);
    }

    async closeModal() {

        await this.modalController.dismiss();
    }
}
