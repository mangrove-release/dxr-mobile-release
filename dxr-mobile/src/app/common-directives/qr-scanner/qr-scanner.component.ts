import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit {

    constructor(public modalController: ModalController, private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {
        close: "Close"
    }
    componentCode: string = AppConstant.COMP.SCAN_QR_CODE;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {
        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    async onCodeResult(resultString: string) {
        var qrData: TripQrData = JSON.parse(resultString);
        await this.modalController.dismiss(qrData);
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
