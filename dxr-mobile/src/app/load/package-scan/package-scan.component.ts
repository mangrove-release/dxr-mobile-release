import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';
import { WasteItemDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfo, DriverTripPlan, DumpingEmissionInfo, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { MenifestoInfo, MenifestoProjectWasteDef, MenifestoTripDef } from 'src/app/models/backend-fetch/menifest';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-package-scan',
    templateUrl: './package-scan.component.html',
    styleUrls: ['./package-scan.component.scss'],
})
export class PackageScanComponent implements OnInit {

    constructor(private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, public modalController: ModalController, private languageService: LanguageService, private menifestoService: MenifestoService) { }

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

                this.generateMenifesto();

                this.saveDumpingEmissionInfo(handoverPickIds);
            }
        })

    }

    saveDumpingEmissionInfo(handoverPickIds: string[]) {
        var dumpingEmissionInfoList: DumpingEmissionInfo[] = [];
        this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {
            var id: string = this.utilService.generateUniqueId();

            var dumpingEmissionInfo: DumpingEmissionInfo = {
                dumpingEmissionId: id,
                companyId: this.dumperCompanyInfo.companyId,
                quantity: eachWaste.totalQunatity,
                dateTime: this.selectedTrip.pickUpDate,
                wasteItemId: eachWaste.wasteId,
                wasteTitle: eachWaste.wasteTitle,
                unit: eachWaste.pickList[0].pick.disposalInfo.unit,
                pickId: handoverPickIds
            }

            dumpingEmissionInfoList.push(dumpingEmissionInfo);
        });

        this.driverDashboardService.saveDumpingEmissionInfo(dumpingEmissionInfoList).subscribe(response => {

        })
    }



    generateMenifesto() {
        debugger
        this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {
            var pickList: PickInfo[] = this.driverDashboardService.getPickListFromWastewisePick(eachWaste.pickList);
            var projectWisePick: any = this.driverDashboardService.groupByProjectId(pickList);

            var projects: string[] = Object.keys(projectWisePick);
            projects.forEach(eachProject => {
                var projectAndProjectId: string[] = eachProject.split('|');
                var projectId: string = projectAndProjectId[0];
                var projectTitle: string = projectAndProjectId[1];
                var agreementInfo: AgreementInfo = {} as AgreementInfo;

                this.menifestoService.getAgreement(projectId).subscribe(response => {
                    if (response) {
                        agreementInfo = response;
                        var projectPickList: PickInfo[] = projectWisePick[eachProject];
                        var id = this.utilService.generateUniqueId();
                        var menifestoUniqueId: string = this.utilService.generateUniqueId() + this.utilService.generateUniqueId();

                        var menifesto: MenifestoInfo = {
                            menifestoInfoId: id,
                            menifestoUniqueId: menifestoUniqueId,
                            date: this.selectedTrip.pickUpDate,
                            projectId: projectAndProjectId[0],
                            tripIds: [this.selectedTrip.tripInfoId],
                            tripIdDef: [],
                            pickIdDef: projectPickList,
                            wasteId: eachWaste.wasteId,
                            projectName: projectAndProjectId[1],
                            creator: agreementInfo.dumperPartnerInfo.companyId + '|' + agreementInfo.dumperPartnerInfo.assignedRoles,
                            firstParty: agreementInfo.transporterPartnerInfo.companyId + '|' + agreementInfo.transporterPartnerInfo.assignedRoles,
                            secondparty: agreementInfo.processorPartnerInfo.companyId + '|' + agreementInfo.processorPartnerInfo.assignedRoles,
                            aggrementInfo: agreementInfo,
                            menifestoStatus: AppConstant.MENIFESTO_STATUS_LOADED
                        }

                        // menifesto.tripIds.push(this.selectedTrip.tripInfoId);
                        var menifestoTripDef: MenifestoTripDef = {
                            tripId: this.selectedTrip.tripInfoId,
                            date: this.selectedTrip.pickUpDate,
                            projectList: []
                        }

                        this.menifestoService.getWasteItemDef(eachWaste.wasteId, (wasteItemDef: WasteItemDef) => {
                            if (wasteItemDef) {
                                var menifestoProjectWasteDef: MenifestoProjectWasteDef = {
                                    projectId: projectId,
                                    wasteIdList: [wasteItemDef]
                                }

                                menifestoTripDef.projectList.push(menifestoProjectWasteDef);

                                menifesto.tripIdDef.push(menifestoTripDef);

                                this.menifestoService.saveMenifesto(menifesto).subscribe(menifesto => {

                                });
                            }
                        })


                    }
                });


            });
        });
    }



}
