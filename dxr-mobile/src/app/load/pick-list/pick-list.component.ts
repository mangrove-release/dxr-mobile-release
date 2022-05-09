import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { DriverTripPlan, PickGroup, PickInfo, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { PickCodeComponent } from '../pick-code/pick-code.component';

@Component({
    selector: 'app-pick-list',
    templateUrl: './pick-list.component.html',
    styleUrls: ['./pick-list.component.scss'],
})
export class PickListComponent implements OnInit {

    constructor(public modalController: ModalController, private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService) { }

    selectedTrip: DriverTripPlan;
    tripDate: any = {
        date: ''
    };
    pickGroup: any[] = [];
    driverUserId: string = '';
    companyId: string = this.utilService.getCompanyIdCookie();
    uiLabels: any = {
        pageHeader: "Pick List",
        pickLocation: "Pick Location",
        wasteItemTitle: "Waste Item",
        quantity: "Quantity",
        pickStatus: "Pick Status",
        qrCodeButton: "QR Code",
        loaded: "Loaded"
    }

    viewContent: boolean = false;

    componentCode: string = AppConstant.COMP.LOAD_PICK_LIST;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.selectedTrip = this.driverTabsDataService.getSelectedTrip();

        this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'pickLocation');
    }

    async showQrCode(selectedPickGroup: string) {

        var qrData: TripQrData = {
            tripInfoId: this.selectedTrip.tripInfoId,
            pickLocation: selectedPickGroup,
            driverCompanyId: this.companyId,
            driverId: this.selectedTrip.driverId
        }
        const modal = await this.modalController.create({
            component: PickCodeComponent,
            componentProps: {
                qrData: qrData,

            }
        });

        return await modal.present();
    }

}
