import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-package-scan',
    templateUrl: './package-scan.component.html',
    styleUrls: ['./package-scan.component.scss'],
})
export class PackageScanComponent implements OnInit {

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
        package: "Package",
        numberOfPackage: "No. of Package",
        wasteList: "Waste List",
        packageList: "Package List",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        confirmReceiveButton: "Confirm Receive",
        pickStatusLoaded: "Loaded",
        confirmLoadToast: "Waste load complete"
    }

    companyId: string = this.utilService.getCompanyIdCookie();
    driverUserInfoId: string = this.languageService.getUserInfoId(this.companyId);
    driverName: string = this.languageService.getUserName(this.companyId);
    transporterCompanyInfo: CompanyInfo = {} as CompanyInfo;
    dumperCompanyInfo: CompanyInfo = {} as CompanyInfo;

    selectedTrip: DriverTripPlan;
    tripDate: any = {
        date: ''
    };
    pickGroup: any[] = [];
    driverUserId: string = '';

    viewContent: boolean = false;

    qrResultString: string = '';
    scanner = false;


    scannedPackgeInfo: PackageInfo[] = [];

    loadPackageView: LoadPackageView = {} as LoadPackageView;

    handoverPackageView: boolean = false;

    handoverConfirmed: boolean = false;


    componentCode: string = AppConstant.COMP.LOAD_PACKAGE_SCAN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.getTransporterCompanyInfo(this.companyId);

    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
        this.scanner = false;
    }

    async openScanner() {

        const modal = await this.modalController.create({
            component: QrScannerComponent,
            componentProps: {
                // companyContext: currentContextInfo,
                // companyContextList: contextList
            }
        });

        await modal.present();

        modal.onDidDismiss().then(data => {
            if (data) {
                this.getTripInfo(data.data);
            }
        });
    }

    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.selectedTrip = response;
            }

            this.getHandoverPackageList(handoverWastePickAndPackage);
        });
    }

    getHandoverPackageList(handoverWastePickAndPackage: HandoverWastePickAndPackage) {
        this.driverDashboardService.getHandoverPackageDefList(handoverWastePickAndPackage.pickIdList).subscribe(response => {
            if (response) {
                this.scannedPackgeInfo = response;
            }

            this.getDumperCompanyInfo(handoverWastePickAndPackage);
        });
    }

    getDumperCompanyInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getPartnerCompanyInfo(handoverWastePickAndPackage.companyId).subscribe(response => {
            if (response) {
                this.dumperCompanyInfo = response;
            }

            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, this.dumperCompanyInfo);
            this.handoverPackageView = true;
        })

    }

    getTransporterCompanyInfo(transporterCompanyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(transporterCompanyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.viewContent = true;
        })

    }

    confirmReceive() {
        var handoverPickIds: string[] = [];
        this.loadPackageView.wasteWisePickPackageList.forEach(element => {
            element.pickList.forEach(eachPick => {
                handoverPickIds.push(eachPick.pick.pickId);
            })

        })

        this.driverDashboardService.confirmHandover(handoverPickIds).subscribe(response => {
            if (response) {
                this.selectedTrip.pickList = response;

                this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, this.dumperCompanyInfo);

                this.handoverConfirmed = true;

                this.driverDashboardService.presentToast(this.uiLabels.confirmLoadToast, 3000);
            }
        })

    }

    // generateMenifesto() {
    //     this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {

    //         this.driverDashboardService.groupByProjectId(eachWaste.pickList[0]);
    //     })
    // }

    // getPickListFromWastewisePick(wastewisePickPackage: WasteWisePickPackageInfo[]) {

    // }
}
