import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompLanguageSetPopupComponent } from 'src/app/super-admin/comp-language-set-popup/comp-language-set-popup.component';
@Component({
    selector: 'app-lang-def-button',
    templateUrl: './lang-def-button.component.html',
    styleUrls: ['./lang-def-button.component.css']
})
export class LangDefButtonComponent implements OnInit {
    @Input()
    componentCode!: string;

    constructor(private modalController: ModalController) { }

    ngOnInit(): void {

    }

    async languageSetPopupopen() {

        const modal = await this.modalController.create({
            component: CompLanguageSetPopupComponent,
            componentProps: {
                componentCode: this.componentCode,

            }
        });

        return await modal.present();

        // const dialogRef = this.dialog.open(CompLanguageSetPopupComponent, {
        //     width: '70%',
        //     data: this.componentCode,
        //     disableClose: true,
        //     autoFocus: true,
        //     hasBackdrop: true,
        //     role: "alertdialog"
        //     // disableClose: true
        // });

    }

}
