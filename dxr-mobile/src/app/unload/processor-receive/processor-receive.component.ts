import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, TripCompletionData, TripQrData, WeightCertificateInfo, WeightCertificateReportData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { TripCompletionCodePopupComponent } from '../trip-completion-code-popup/trip-completion-code-popup.component';

@Component({
    selector: 'app-processor-receive',
    templateUrl: './processor-receive.component.html',
    styleUrls: ['./processor-receive.component.scss'],
})
export class ProcessorReceiveComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router, public modalController: ModalController) { }

    uiLabels: any = {
        pageHeader: "Waste Receive Information",
        tripInfo: "Trip Info",
        companyName: "Transporter Company",
        personInChargeName: "Person in Charge",
        contactNo: "Contact No",
        dropLocation: "Drop Location",
        tripDate: "Trip Date",
        vehicleName: "Vehicle Name",
        vehicleRegNo: "Vehicle No",
        driverName: "Driver",
        driverLicenseNo: "License No",
        date: "Date",
        wasteItemTitle: "Waste Item",
        totalQuantity: "Total Quantity",
        comfirmLoadButton: "Confirm Load",
        pick: "Pick",
        projectTitle: "Project",
        wasteQuantity: "Weight",
        declaredQuantity: "Calculated Weight",
        generateTripCompleteQrCode: "Generate QR",
        generateWeightDeclareCertificate: "Generate Weight Certificate",
        scaleInfoHeader: "Scale Info",
        viewScaleInfoButton: "View",
        receivedWasteList: "Recevied Waste List",
        "weightCertificateLabel": "Weight Certificate",
        "licenseLabel": "LC-4353353Mk",
        "transporterNameLabel": "Transporter Name",
        "vehicleNameNumberLabel": "Vehicle Name & Number",
        "gorssWeightlabel": "Gorss Weight",
        "wasteTrackLabel": "Waste+Track Weight",
        "truckWeightLabel": "Only Truck Weight",
        "totalLabel": "Total",
        "remarksLabel": "Remark",
        "signLabel": "Sign",
        "nameLabel": "Name",
        "performanceLabel": "Performance",
        "equipmentLabel": "Equipment",
        "quintityLabel": "Quintity",
        "telLabel": "TEL",
        "faxLabel": "FAX",
    }

    companyId: string = this.utilService.getCompanyIdCookie();

    driverTripPlan: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    processorCompanyInfo: CompanyInfo;
    scannedTripInfo: TripQrData;
    handoverWastePickAndPackage: HandoverWastePickAndPackage;
    scannedPackgeInfo: PackageInfo[] = [];
    loadPackageView: LoadPackageView;

    viewContent = false;

    handoverPackageView: boolean = false;

    componentCode: string = AppConstant.COMP.UNLOAD_PROCESSOR_RECEIVE;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        this.utilService.printLangDef(this.uiLabels, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.handoverWastePickAndPackage = this.driverTabsDataService.getTransporterHandoverData();
        this.getHandoverPackageList(this.handoverWastePickAndPackage);
    }

    getTripInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getTripInfo(handoverWastePickAndPackage.tripInfoId).subscribe(response => {
            if (response) {
                this.driverTripPlan = response;
            }

            this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.driverTripPlan, this.scannedPackgeInfo, this.transporterCompanyInfo, this.processorCompanyInfo);

            this.viewContent = true;
        });
    }

    getTransporterCompanyInfo(handoverWastePickAndPackage: HandoverWastePickAndPackage) {

        this.driverDashboardService.getPartnerCompanyInfo(handoverWastePickAndPackage.companyId).subscribe(response => {
            if (response) {
                this.transporterCompanyInfo = response;
            }
            this.getProcessorCompanyInfo(this.companyId);
        });
    }

    getProcessorCompanyInfo(companyId: string) {

        this.driverDashboardService.getPartnerCompanyInfo(companyId).subscribe(response => {
            if (response) {
                this.processorCompanyInfo = response;
            }
            this.getTripInfo(this.handoverWastePickAndPackage);

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

    async generateTripCompletionQrCoe() {
        var tripCompletionData: TripCompletionData = {
            companyId: this.companyId,
            tripInfoId: this.driverTripPlan.tripInfoId,
            pickIdList: this.handoverWastePickAndPackage.pickIdList
        }


        const modal = await this.modalController.create({
            component: TripCompletionCodePopupComponent,
            componentProps: {
                tripCompletionData: tripCompletionData,

            }
        });

        return await modal.present();
    }

    generateWeightCertificate() {
        debugger
        var weightCertificateInfo: WeightCertificateInfo = this.driverTabsDataService.getWeightCertificateInfo();

        var weightCertificateData: WeightCertificateReportData = this.driverDashboardService.prepareWeightCertificateData(weightCertificateInfo, this.uiLabels);

        this.driverDashboardService.generateReport(weightCertificateData);
    }
}
