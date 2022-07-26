import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrScannerComponent } from 'src/app/common-directives/qr-scanner/qr-scanner.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo, AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { WasteItemDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfo, DriverTripPlan, DumpingEmissionInfo, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { DumperInfo, ManifestoDisposeWasteInfo, ManifestoProcessWasteInfo, ManifestoWasteItemDef, ManualManifesto, MenifestoInfo, MenifestoProjectWasteDef, MenifestoTripDef, NotificationSetInfo, ProcessorInfo, TranshipmentInfo, TransportInfo } from 'src/app/models/backend-fetch/menifest';
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
        confirmLoadToast: "Waste load complete",
        pickAlreadyLoadToast: 'Pick are already loaded'
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

    hidePackageDefInfo = AppConstant.HIDE_PACKAGE_DEF_INFO;

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
                if (eachPick.pick.loadStatus != AppConstant.PICK_LOAD_STATUS && eachPick.pick.loadStatus != AppConstant.PICK_UNLOAD_STATUS) {
                    handoverPickIds.push(eachPick.pick.pickId);
                }
            });

        });

        if (handoverPickIds && handoverPickIds.length > 0) {

            this.driverDashboardService.confirmHandover(handoverPickIds).subscribe(response => {
                if (response) {
                    this.selectedTrip.pickList = response;

                    this.loadPackageView = this.driverDashboardService.preparePackageInfo(this.selectedTrip, this.scannedPackgeInfo, this.transporterCompanyInfo, this.dumperCompanyInfo);

                    // this.handoverConfirmed = true;

                    this.driverDashboardService.presentToast(this.uiLabels.confirmLoadToast, 3000);

                    this.generateMenifesto();

                    this.saveDumpingEmissionInfo();
                }
            });
        } else {
            this.utilService.showSnackbar(this.uiLabels.pickAlreadyLoadToast, 3000);
        }

    }

    saveDumpingEmissionInfo() {
        var dumpingEmissionInfoList: DumpingEmissionInfo[] = [];
        if (this.loadPackageView && this.loadPackageView.wasteWisePickPackageList) {

            this.loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {

                if (eachWaste && eachWaste.pickList) {
                    eachWaste.pickList.forEach(eachPick => {

                        var id: string = this.utilService.generateUniqueId();

                        var dumpingEmissionInfo: DumpingEmissionInfo = {
                            dumpingEmissionId: id,
                            companyId: this.dumperCompanyInfo.companyId,
                            quantity: eachPick.pick.quantity,
                            dateTime: this.selectedTrip.pickUpDate,
                            wasteItemId: eachWaste.wasteId,
                            wasteTitle: eachWaste.wasteTitle,
                            unit: eachPick.pick.disposalInfo.unit,
                            pickId: eachPick.pick.pickId,
                            projectInfoId: eachPick.pick.projetId
                        }

                        dumpingEmissionInfoList.push(dumpingEmissionInfo);
                    });

                }

            });
        }

        this.driverDashboardService.saveDumpingEmissionInfo(dumpingEmissionInfoList).subscribe(response => {

        })
    }

    prepareManualManifesto(menifesto: MenifestoInfo): MenifestoInfo {
        var manualManifesto: ManualManifesto = {} as ManualManifesto;

        var dumper: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var transporter: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var processor: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var dumperInfo: DumperInfo = {
            companyId: dumper.companyId,
            personInChargerId: dumper.personInChargeId,
            personInchargeEmail: dumper.personInchargeEmail,
            personName: dumper.personInChargeName,
            businessName: dumper.companyName,
            zipCode: dumper.companyZipCode,
            address: dumper.companyAddress,
            contactNo: dumper.contactNo,
            workPlace: dumper.companyName,
            workZip: dumper.companyZipCode,
            workAddress: dumper.companyAddress,
            workContactNo: dumper.contactNo,
        }

        var manifestoDisposeWasteInfoList: ManifestoDisposeWasteInfo[] = [];
        menifesto.pickIdDef.forEach(eachPick => {
            var manifestoDisposeWasteInfo: ManifestoDisposeWasteInfo = {
                collectionId: eachPick.disposalInfo.collectionId,
                wasteId: eachPick.disposalInfo.wasteItemId,
                wasteName: eachPick.disposalInfo.wasteItemName,
                unit: eachPick.disposalInfo.unit,
                shape: eachPick.disposalInfo.wasteShape,
                wastePackage: eachPick.disposalInfo.wastePackage,
                quantity: eachPick.quantity,
                transportPrice: eachPick.disposalInfo.price
            }

            manifestoDisposeWasteInfoList.push(manifestoDisposeWasteInfo);

        });

        var totalQuantity = 0;

        var manifestoProcessWasteInfoList: ManifestoProcessWasteInfo[] = [];

        menifesto.tripIdDef.forEach(tripDef => {
            tripDef.projectList.forEach(eachProject => {
                eachProject.wasteIdList.forEach(eachWaste => {
                    var manifestoProcessWasteInfo: ManifestoProcessWasteInfo = {
                        collectionId: eachWaste.collectionId,
                        wasteId: eachWaste.wasteId,
                        wasteName: eachWaste.wasteTitle,
                        unit: eachWaste.unitDef,
                        shape: eachWaste.wasteShape,
                        wastePackage: eachWaste.wastePackage,
                        quantity: eachWaste.totalQunatity,
                        establishedQuantity: eachWaste.totalDeclaredQunatity,
                        processPrice: eachWaste.processingPrice,
                    }

                    totalQuantity += eachWaste.totalQunatity;

                    manifestoProcessWasteInfoList.push(manifestoProcessWasteInfo);
                });
            });
        });

        var transhipmentInfo: TranshipmentInfo = {
            storageName: '',
            inCharge: '',
            zipCode: '',
            address: '',
        }

        var transportInfo: TransportInfo = {
            companyId: transporter.companyId,
            personInChargerId: transporter.personInChargeId,
            personInchargeEmail: transporter.personInchargeEmail,
            personName: transporter.personInChargeName,
            businessName: transporter.companyName,
            zipCode: transporter.companyZipCode,
            address: transporter.companyAddress,
            contactNo: transporter.contactNo,
            vehicleNo: "",
            vehicleType: "",
            transportMethod: "",
            transportComplateDate: this.selectedTrip.pickUpDate,
            transportComplateDateView: "",
            transportComplateDateB2: this.selectedTrip.pickUpDate,
            transportComplateDateB2View: "",
            driverName: "",
        }

        var processorInfo: ProcessorInfo = {
            companyId: processor.companyId,
            personInChargerId: processor.personInChargeId,
            personInchargeEmail: processor.personInchargeEmail,
            personName: processor.personInChargeName,
            businessName: processor.companyName,
            zipCode: processor.companyZipCode,
            address: processor.companyAddress,
            contactNo: processor.contactNo,
            processingComplateDate: "",
            processingComplateDateView: "",
            processingComplateDateC2: "",
            processingComplateDateC2View: "",
            disposeComplateDate: "",
            disposeComplateDateView: "",
            finalDisposeComplateDate: "",
            finalDisposeComplateDateView: ""

        }

        manualManifesto.date = this.selectedTrip.pickUpDate;
        manualManifesto.deliveryNo = "";
        manualManifesto.manifestoNo = menifesto.menifestoUniqueId;
        manualManifesto.refNo = "";
        manualManifesto.dumperInfo = dumperInfo;
        manualManifesto.manifestoDisposeWasteInfo = manifestoDisposeWasteInfoList;
        manualManifesto.manifestoProcessWasteInfo = manifestoProcessWasteInfoList;
        manualManifesto.transhipmentInfo = transhipmentInfo;
        manualManifesto.transportInfo = transportInfo;
        manualManifesto.totalQuantity = totalQuantity;
        manualManifesto.processorInfo = processorInfo;
        manualManifesto.additionalInfo = "";

        menifesto.manualManifesto = manualManifesto;

        return menifesto;
    }


    generateMenifesto() {

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
                            date: "",
                            dateView: "",
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
                            menifestoStatus: AppConstant.MENIFESTO_STATUS_LOADED,
                            manualManifesto: {} as ManualManifesto,
                            manifestoType: AppConstant.MANIFESTO_TYPE_GENERATED,
                            manualEdit: false
                        }

                        // menifesto.tripIds.push(this.selectedTrip.tripInfoId);
                        var menifestoTripDef: MenifestoTripDef = {
                            tripId: this.selectedTrip.tripInfoId,
                            date: this.selectedTrip.pickUpDate,
                            projectList: []
                        }

                        this.menifestoService.getWasteItemDef(eachWaste.wasteId, (wasteItemDef: ManifestoWasteItemDef) => {
                            if (wasteItemDef) {
                                wasteItemDef.totalQunatity = eachWaste.totalQunatity;
                                wasteItemDef.totalDeclaredQunatity = eachWaste.totalDeclaredQunatity;
                                wasteItemDef.collectionId = eachWaste.pickList[0].pick.disposalInfo.collectionId;
                                var menifestoProjectWasteDef: MenifestoProjectWasteDef = {
                                    projectId: projectId,
                                    wasteIdList: [wasteItemDef]
                                }

                                menifestoTripDef.projectList.push(menifestoProjectWasteDef);

                                menifesto.tripIdDef.push(menifestoTripDef);

                                menifesto = this.prepareManualManifesto(menifesto);

                                this.menifestoService.saveMenifesto(menifesto).subscribe(menifesto => {

                                    if (menifesto) {
                                        var notificationSetInfo: NotificationSetInfo = {
                                            contextId: AppConstant.MANIFESTO_NOTIFICAIONT_ID,
                                            companyId: this.transporterCompanyInfo.companyId,
                                            baseTableId: menifesto.aggrementInfo.agreementId,
                                            trigerUserInfoId: this.utilService.getUserIdCookie(),
                                            status: AppConstant.MANIFESTO_LOAD_STATUS
                                        }

                                        this.menifestoService.generateNotiForManifestoCreate(notificationSetInfo).subscribe(response => {

                                        });
                                    }

                                });
                            }
                        })


                    }
                });


            });
        });
    }



}
