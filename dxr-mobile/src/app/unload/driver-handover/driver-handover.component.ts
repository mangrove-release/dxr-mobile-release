import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { HandoverCodeComponent } from 'src/app/load/handover-code/handover-code.component';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-driver-handover',
    templateUrl: './driver-handover.component.html',
    styleUrls: ['./driver-handover.component.scss'],
})
export class DriverHandoverComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, public modalController: ModalController, private languageService: LanguageService) { }

    uiLabels: any = {
        pageHeader: "Package Scan",
        openScannerButton: "Open Scanner",
        tripPackageInfo: "Trip Package Info",
        companyName: "Company",
        dumperCompanyName: "Dumper Company",
        transporterCompanyName: "Transporter Company",
        date: "Date",
        vehicleName: "Vehicle",
        driverName: "Driver",
        wasteItemTitle: "Waste Item",
        totalQuantity: "Total Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        projectTitle: "Project",
        pickQuantity: "Quantity",
        package: "Packages",
        numberOfPackage: "No. of Package",
        wasteList: "Waste List",
        packageList: "Package List",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        generateWasteUnloadQrCode: "Generate QR",
        pickStatusLoaded: "Loaded"
    }

    companyId: string = this.utilService.getCompanyIdCookie();
    driverUserInfoId: string = this.languageService.getUserInfoId(this.companyId);
    driverName: string = this.languageService.getUserName(this.companyId);
    transporterCompanyInfo: CompanyInfo = {} as CompanyInfo;
    handoverPickList: string[] = [];

    selectedTrip: DriverTripPlan;
    tripDate: any = {
        date: ''
    };
    pickGroup: any[] = [];
    driverUserId: string = '';

    viewContent: boolean = false;

    qrResultString: string = '';
    scanner = false;


    scannedPackgeInfo: PackageInfo[] = [
        {
            packageId: 'package0001',
            size: 2,
            numberOfPackage: 5,
            quantity: 10,
            pickId: 'pick0001',
            disposeId: '',
            tripId: '',
            isLumpsum: ""
        },
        {
            packageId: 'package0002',
            size: 3,
            numberOfPackage: 3,
            quantity: 9,
            pickId: 'pick0002',
            disposeId: '',
            tripId: '',
            isLumpsum: ""
        },
        {
            packageId: 'package0003',
            size: 4,
            numberOfPackage: 5,
            quantity: 20,
            pickId: 'pick0003',
            disposeId: '',
            tripId: '',
            isLumpsum: ""
        }
    ];

    loadPackageView: LoadPackageView = {} as LoadPackageView;

    handoverPackageView: boolean = false;

    componentCode: string = AppConstant.COMP.UNLOAD_HANDOVER;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.selectedTrip = this.driverTabsDataService.getSelectedTrip();

        this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'dropLocation');

        this.getTransporterCompanyInfo(this.companyId);

    }

    getTransporterCompanyInfo(transporterCompanyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(transporterCompanyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }

            var pickIdList: string[] = this.preparePickIdList(this.selectedTrip.pickList);

            this.getHandoverPackageList(pickIdList);
        })

    }

    preparePickIdList(pickList: PickInfo[]) {
        var pickIdList: string[] = [];
        pickList.forEach(element => {
            pickIdList.push(element.pickId);
        });

        return pickIdList;
    }

    getHandoverPackageList(pickIdList: string[]) {

        this.driverDashboardService.getHandoverPackageDefList(pickIdList).subscribe(response => {
            if (response) {
                this.scannedPackgeInfo = response;
            }

            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, {} as CompanyInfo);
            this.viewContent = true;
            this.handoverPackageView = true;

        });
    }

    // preparePackageInfo(handoverWastePickAndPackage?: HandoverWastePickAndPackage) {

    //     var loadPackage: LoadPackageView = {
    //         dumperInfo: {} as CompanyInfo,
    //         transporterInfo: this.transporterCompanyInfo,
    //         wasteWisePickPackageList: []
    //     };

    //     this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'dropLocation');

    //     this.selectedTrip.pickList.forEach(eachPick => {
    //         var pickWisePackage: PickWisePackage = {
    //             packageList: [],
    //             pick: eachPick,
    //             calculatedQunatity: eachPick.quantity
    //         };
    //         var wasteWisePickPackageInfo: WasteWisePickPackageInfo = {
    //             wasteId: eachPick.disposalInfo.wasteItemId,
    //             wasteTitle: eachPick.disposalInfo.wasteItemName,
    //             pickList: [],
    //             totalQunatity: 0
    //         }
    //         this.scannedPackgeInfo.forEach(eachPackage => {

    //             if (eachPackage.pickId == eachPick.pickId) {
    //                 pickWisePackage.packageList.push(eachPackage);

    //             }

    //         });

    //         if (pickWisePackage.packageList.length > 0) {
    //             var index = loadPackage.wasteWisePickPackageList.findIndex(item => item.wasteId == eachPick.disposalInfo.wasteItemId);

    //             if (index >= 0) {

    //                 loadPackage.wasteWisePickPackageList[index].pickList.push(pickWisePackage);

    //             } else {

    //                 wasteWisePickPackageInfo.pickList.push(pickWisePackage);

    //                 loadPackage.wasteWisePickPackageList.push(wasteWisePickPackageInfo);
    //             }
    //         }

    //     });

    //     return loadPackage;
    // }

    prepareHandoverPickList(loadPackageView: LoadPackageView) {
        var handoverPickList: PickWisePackage[] = [];
        loadPackageView.wasteWisePickPackageList.forEach(element => {
            element.pickList.forEach(pickInfo => {
                handoverPickList.push(pickInfo);
            });
        });

        return handoverPickList;
    }

    async generateHandoverQrCode(groupedPickList: PickInfo[]) {
        var picKIdList: string[] = [];

        groupedPickList.forEach(eachPick => {
            picKIdList.push(eachPick.pickId);
        })

        var handoverPickList: HandoverWastePickAndPackage = {
            companyId: this.companyId,
            tripInfoId: this.selectedTrip.tripInfoId,
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
}
