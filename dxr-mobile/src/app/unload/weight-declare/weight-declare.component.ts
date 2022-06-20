import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { ScaleSettingInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo, WeightCertificateInfo } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-weight-declare',
    templateUrl: './weight-declare.component.html',
    styleUrls: ['./weight-declare.component.scss'],
})
export class WeightDeclareComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private router: Router, public modalController: ModalController, private languageService: LanguageService, private toastController: ToastController) { }

    uiLabels: any = {
        pageHeader: "Verify Waste Package",
        tripPackageInfo: "Trip Package Info",
        processorCompanyName: "Processor Company",
        transporterCompanyName: "Transporter Company",
        date: "Date",
        vehicleName: "Vehicle",
        driverName: "Driver",
        wasteItemTitle: "Waste Item",
        wasteQuantity: "Waste Quantity",
        calculatedWasteQuantity: "Calculated Waste Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        projectTitle: "Project",
        pickQuantity: "Quantity",
        package: "Package",
        numberOfPackage: "No. of Package",
        wasteList: "Waste List",
        packageList: "Packages",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        confirmPackageWeightButton: "Confirm",
        pickStatusLoaded: "Loaded",
        weightSaveToast: "Weight Declaration Confirmed",
        selectScale: "Select Scale",
        grossWeight: "Gross Weight",
        vehicleWeight: "Vehicle Weight"
    }

    companyId: string = this.utilService.getCompanyIdCookie();
    driverUserInfoId: string = this.languageService.getUserInfoId(this.companyId);
    driverName: string = this.languageService.getUserName(this.companyId);

    transporterCompanyInfo: CompanyInfo = {} as CompanyInfo;
    processorCompanyInfo: CompanyInfo = {} as CompanyInfo;

    handoverWastePickAndPackage: HandoverWastePickAndPackage;

    scannedPackgeInfo: PackageInfo[] = [];

    selectedTrip: DriverTripPlan;

    loadPackageView: LoadPackageView = {} as LoadPackageView;

    scaleList: ScaleSettingInfo[] = [];
    selectedScale: ScaleSettingInfo;

    weightCertificateInfo: WeightCertificateInfo = {
        weightCertificateInfoId: '',
        date: '',
        dateView: '',
        tripId: '',
        pickList: '',
        wasteGrossWeight: 0,
        vehicleWeight: 0,
        wasteNetWeight: 0,
        processorCompanyInfo: {} as CompanyInfo,
        transporterCompanyInfo: {} as CompanyInfo,
        driverInfo: {} as DriverTripPlan,
        scaleInfo: {} as ScaleSettingInfo,
        wasteList: [],

    }

    viewContent: boolean = false;
    handoverPackageView: boolean = false;
    componentCode: string = AppConstant.COMP.UNLOAD_WEIGHT_DECLARE;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.handoverWastePickAndPackage = this.driverTabsDataService.getTransporterHandoverData();

        this.getCompanyScaleList();


    }

    getCompanyScaleList() {

        this.driverDashboardService.getCompanyScaleList(this.companyId).subscribe(res => {
            if (res && res.length > 0) {
                this.scaleList = res;
                this.weightCertificateInfo.scaleInfo = this.scaleList[0];
            }

            if (this.handoverWastePickAndPackage) {
                this.getTripInfo(this.handoverWastePickAndPackage);
            }
        })
    }

    saveWeightCertificateInfo() {
        this.weightCertificateInfo = this.prepareWeightCertificateInfo(this.weightCertificateInfo);
        debugger
        this.driverDashboardService.saveWeightCertificateInfo(this.weightCertificateInfo).subscribe(response => {
            if (response) {
                this.driverTabsDataService.setWeightCertificateInfo(response);
            }

            this.router.navigate([AppConstant.UNLOAD_MENU_PARENT_SEGMENT, { outlets: { unloadOutlet: [AppConstant.PROCESSOR_RECEIVE_MENU_URL] } }]);
        })
    }

    prepareWeightCertificateInfo(weightCertificateInfo: WeightCertificateInfo) {
        weightCertificateInfo.weightCertificateInfoId = this.utilService.generateUniqueId();
        weightCertificateInfo.date = this.selectedTrip.pickUpDate;
        weightCertificateInfo.tripId = this.selectedTrip.tripInfoId;
        weightCertificateInfo.pickList = this.prepareWeightedPickList();
        weightCertificateInfo.wasteNetWeight = weightCertificateInfo.wasteGrossWeight - weightCertificateInfo.vehicleWeight;
        weightCertificateInfo.processorCompanyInfo = this.processorCompanyInfo;
        weightCertificateInfo.transporterCompanyInfo = this.transporterCompanyInfo;
        weightCertificateInfo.driverInfo = this.selectedTrip;
        weightCertificateInfo.wasteList = this.loadPackageView.wasteWisePickPackageList;

        return weightCertificateInfo;
    }

    prepareWeightedPickList(): string {
        var pickList: string[] = [];
        this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {
            eachWaste.pickList.forEach(eachPick => {
                pickList.push(eachPick.pick.pickId);
            });
        });

        return pickList.join("|");
    }


    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.selectedTrip = response;
                this.weightCertificateInfo.driverInfo = response;
            }

            this.getHandoverPackageList(handoverWastePickAndPackage);
        });
    }

    getHandoverPackageList(handoverWastePickAndPackage: HandoverWastePickAndPackage) {
        this.driverDashboardService.getHandoverPackageDefList(handoverWastePickAndPackage.pickIdList).subscribe(response => {
            if (response) {
                this.scannedPackgeInfo = response;
            }

            this.getTransporterCompanyInfo(handoverWastePickAndPackage);
        });
    }

    getProcessorCompanyInfo(companyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(companyId).subscribe(response => {
            if (response) {
                this.processorCompanyInfo = response;
            }
            this.viewContent = true;
        });
    }


    getTransporterCompanyInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getPartnerCompanyInfo(handoverWastePickAndPackage.companyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.getProcessorCompanyInfo(this.companyId);
            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, this.processorCompanyInfo);
            this.handoverPackageView = true;

        })

    }

    prepareReceivedWeightForSave() {
        var pickList: PickInfo[] = [];
        this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {
            eachWaste.pickList.forEach(eachPick => {
                pickList.push(eachPick.pick);
            });
        });

        return pickList;
    }

    receivedWasteWeightConfirmation() {

        var pickList: PickInfo[] = this.prepareReceivedWeightForSave();

        this.driverDashboardService.confirmReceivedWeight(pickList).subscribe(respose => {
            if (respose && respose == AppConstant.TRUE_STATEMENT) {
                this.driverDashboardService.presentToast(this.uiLabels.weightSaveToast, 3000);

            }

            this.saveWeightCertificateInfo();


        });


    }



}
