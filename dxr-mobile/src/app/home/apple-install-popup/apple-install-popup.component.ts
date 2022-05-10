import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-apple-install-popup',
    templateUrl: './apple-install-popup.component.html',
    styleUrls: ['./apple-install-popup.component.scss'],
})
export class AppleInstallPopupComponent implements OnInit {

    constructor(private utilService: UtilService, public modalController: ModalController, private languageService: LanguageService) { }

    ngOnInit() { }

    async closeModal() {

        await this.modalController.dismiss();
    }
}
