import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from '../services/visitor-services/language.service';
import { UtilService } from '../services/visitor-services/util.service';
import { AppleInstallPopupComponent } from './apple-install-popup/apple-install-popup.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private utilService: UtilService, public modalController: ModalController, private languageService: LanguageService) { }

    ngOnInit() {
        debugger
        const isIos = this.utilService.isIos();
        const isInStandaloneMode = this.utilService.isInStandaloneMode();
        // if (isIos && !isInStandaloneMode) {
        this.showInstallPopup();
        // }
    }

    async showInstallPopup() {
        const opts = {
            breakpoints: [0, 0.2],
            initialBreakpoint: 0.2,
        }
        const modal = await this.modalController.create({
            component: AppleInstallPopupComponent,
            ...opts,
        });

        await modal.present();
    }

}
