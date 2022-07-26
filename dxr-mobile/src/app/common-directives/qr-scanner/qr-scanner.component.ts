import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripQrData } from 'src/app/models/backend-fetch/driver-op';

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit {

    constructor(public modalController: ModalController) { }

    ngOnInit() {

    }

    async onCodeResult(resultString: string) {
        var qrData: TripQrData = JSON.parse(resultString);
        await this.modalController.dismiss(qrData);
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
