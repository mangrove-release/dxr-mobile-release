import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { HandoverCodeComponent } from 'src/app/load/handover-code/handover-code.component';
import { HandoverComponent } from 'src/app/load/handover/handover.component';
import { CompanyInfo, DriverTripFetch, DriverTripPlan, HandoverWastePickAndPackage, PickInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { DriverHandoverComponent } from '../driver-handover/driver-handover.component';

@Component({
    selector: 'app-unload-dashborad',
    templateUrl: './unload-dashborad.component.html',
    styleUrls: ['./unload-dashborad.component.scss'],
})
export class UnloadDashboradComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, private languageService: LanguageService, public modalController: ModalController) { }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: ''
    };
    driverUserId: string = '';
    companyId: string = '';
    pickGroup: any[] = [];

    uiLabels: any = {
        pageHeader: "Driver Dashboard",
        dateLabel: "Trip Date",
        loadTripList: "Load Trip List",
        tripList: "Trip List",
        tripTime: "Trip Time",
        pickListButton: "Drop List",
    }

    viewContent: boolean = false;

    componentCode: string = AppConstant.COMP.UNLOAD_DRIVER_DASHBOARD;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();
        this.driverUserId = this.languageService.getUserInfoId(this.companyId);

        this.driverDashboardService.getCurrentDate().subscribe(response => {
            if (response) {
                this.tripDate.date = response.date;
            }

            this.getDriverTripPlan(this.driverUserId, this.tripDate.date);
        })
        // this.tripDate.date = this.utilService.getCurrentDate();
    }

    getDriverTripPlan(driverUserId: string, date: string) {

        var driverTripFetch: DriverTripFetch = {
            date: date,
            driverId: driverUserId
        }

        this.driverDashboardService.getDriverTrip(driverTripFetch).subscribe(data => {
            if (data) {
                this.driverTripPlan = data;
                this.driverTabsDataService.setDriverTripPlan(data);
                this.prepareView();
            }
            this.viewContent = true;

        })
    }

    prepareView() {

        this.driverTripPlan.forEach(eachTrip => {
            eachTrip.pickGroup = this.driverDashboardService.groupBy(eachTrip.pickList, 'dropLocation');


            // var pickIdList: string[] = this.preparePickIdList(eachTrip.pickList);

            // this.getHandoverPackageList(pickIdList);
        })

    }

    // preparePickIdList(pickList: PickInfo[]) {
    //     var pickIdList: string[] = [];
    //     pickList.forEach(element => {
    //         pickIdList.push(element.pickId);
    //     });

    //     return pickIdList;
    // }

    // getHandoverPackageList(pickIdList: string[]) {

    //     this.driverDashboardService.getHandoverPackageDefList(pickIdList).subscribe(response => {
    //         if (response) {
    //             this.scannedPackgeInfo = response;
    //         }

    //         this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, {} as CompanyInfo);

    //     });
    // }

    selectedTrip(selectedTrip: DriverTripPlan) {
        this.driverTabsDataService.setSelectedTrip(selectedTrip);

        // this.router.navigate(['/driver', { outlets: { driverOutlet: ['pick-list'] } }]);
    }

    async generateHandoverQrCode(selectedTrip: DriverTripPlan, groupedPickList: any) {

        var picKIdList: string[] = [];

        groupedPickList.forEach(eachPick => {
            picKIdList.push(eachPick.pickId);
        })

        var handoverPickList: HandoverWastePickAndPackage = {
            companyId: this.companyId,
            tripInfoId: selectedTrip.tripInfoId,
            pickIdList: picKIdList
        }

        // this.driverDashboardService.generateWasteHandoverQrCode(pickWisePackageList, this.selectedTrip.tripInfoId, this.companyId);

        const modal = await this.modalController.create({
            component: HandoverCodeComponent,
            componentProps: {
                handoverPickList: handoverPickList,

            }
        });

        return await modal.present();

    }

    async showDropLocationUnloadDetails(selectedTrip: DriverTripPlan, groupedPickList: any) {

        this.driverTabsDataService.setSelectedTrip(selectedTrip);

        // var picKIdList: string[] = [];

        // groupedPickList.forEach(eachPick => {
        //     picKIdList.push(eachPick.pickId);
        // })

        // var handoverPickList: HandoverWastePickAndPackage = {
        //     companyId: this.companyId,
        //     tripInfoId: selectedTrip.tripInfoId,
        //     pickIdList: picKIdList
        // }

        // this.driverDashboardService.generateWasteHandoverQrCode(pickWisePackageList, this.selectedTrip.tripInfoId, this.companyId);

        const modal = await this.modalController.create({
            component: DriverHandoverComponent,
            componentProps: {
                // handoverPickList: handoverPickList,

            }
        });

        return await modal.present();
    }

}
