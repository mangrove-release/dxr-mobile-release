import { Component, OnInit } from '@angular/core';
import { DxrLanguageDef, DxrLanguageDefBack, LanguageDefinition } from 'src/app/models/language-def';
import { LanguageSetupService } from 'src/app/services/operation-services/language-setup.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { LanguageDefAddPopupComponent } from '../language-def-add-popup/language-def-add-popup.component';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
    selector: 'app-comp-language-set-popup',
    templateUrl: './comp-language-set-popup.component.html',
    styleUrls: ['./comp-language-set-popup.component.css']
})
export class CompLanguageSetPopupComponent implements OnInit {

    constructor(private navParams: NavParams, private languageService: LanguageService, public languageSetupService: LanguageSetupService, private modalController: ModalController) { }

    languageInfo!: DxrLanguageDef;
    componentList: LanguageDefinition[] = [];
    componentCode: string = '';
    viewContent: boolean = false;

    ngOnInit(): void {

        if (this.navParams) {
            this.componentCode = this.navParams.data.componentCode;
        }

        this.languageSetupService.getLanguageDef((component: DxrLanguageDefBack) => {

            if (component) {
                this.languageInfo = this.convertLanguageDefBackToFront(component);
                this.componentList = this.languageInfo.languageJson;

            }
            this.viewContent = true;
        })

    }

    convertLanguageDefBackToFront(languageDefBack: DxrLanguageDefBack): DxrLanguageDef {
        var dxrLanguageDef: DxrLanguageDef = {
            languageCompetencyId: languageDefBack.languageCompetencyId,
            languageJson: JSON.parse(languageDefBack.languageJson),
            backendDate: languageDefBack.backendDate,
            frontendDate: languageDefBack.frontendDate,
            dxrInfoCache: languageDefBack.dxrInfoCache

        }

        return dxrLanguageDef;
    }

    selectedItem: any
    selectListItem(item: any): void {
        this.selectedItem = item;
    }

    saveIntoDatabase() {

        var parsedLanguageDef = JSON.stringify(this.componentList);
        this.languageSetupService.updateLanguageDef(parsedLanguageDef).subscribe((data) => {
            if (data) {
                if (confirm('Page will reload')) {
                    window.location.assign('/');
                } else {

                }
            }

        })
    }
    async popupOpenForAddLabel(langArray: any[]) {
        var message: string = "Add Label"
        const modal = await this.modalController.create({
            component: LanguageDefAddPopupComponent,
            componentProps: {
                message: message,

            },
            cssClass: 'qr-popup-size'
        });

        modal.onDidDismiss().then(data => {
            if (data.data) {
                langArray.unshift(data);
            }
        })

        return await modal.present();

        // const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
        //     width: '70%',
        //     data: message
        // });
        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data) {
        //         langArray.unshift(data);
        //     }
        // });
    }
    async popupOpenForAddMessage(langArray: any[]) {

        var message: string = "Add Message"

        const modal = await this.modalController.create({
            component: LanguageDefAddPopupComponent,
            componentProps: {
                message: message,

            },
            cssClass: 'qr-popup-size'
        });

        modal.onDidDismiss().then(data => {
            if (data.data) {
                langArray.unshift(data);
            }
        })

        return await modal.present();

        // const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
        //     width: '70%',
        //     data: message
        // });
        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data) {
        //         langArray.unshift(data);
        //     }
        // });
    }
    async popupOpenForAddNotification(langArray: any[]) {

        var message: string = "Add Notification"
        const modal = await this.modalController.create({
            component: LanguageDefAddPopupComponent,
            componentProps: {
                message: message,

            },
            cssClass: 'qr-popup-size'
        });

        modal.onDidDismiss().then(data => {
            if (data.data) {
                langArray.unshift(data);
            }
        })

        return await modal.present();

        // const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
        //     width: '70%',
        //     data: message
        // });
        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data) {
        //         langArray.unshift(data);
        //     }
        // });
    }

    async closeModal() {

        await this.modalController.dismiss();
    }

}
