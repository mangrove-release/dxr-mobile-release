import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { HandoverCodeComponent } from 'src/app/load/handover-code/handover-code.component';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { ManifestoProcessWasteInfo, MenifestoInfo, MenifestoTripDef, MenifestoWaste, MenifestReportCallData, MenifestReportData } from 'src/app/models/backend-fetch/menifest';
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

    hidePackageDefInfo = AppConstant.HIDE_PACKAGE_DEF_INFO;

    manifestoReportLabel: any = {}

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.selectedTrip = this.driverTabsDataService.getSelectedTrip();

        this.pickGroup = this.driverDashboardService.groupBy(this.selectedTrip.pickList, 'dropLocation');

        this.getTransporterCompanyInfo(this.companyId);

        var manifestoReportLabelComponentCode = AppConstant.COMP.MENIFESTO_LIST;
        this.manifestoReportLabel = this.languageService.getUiLabels(manifestoReportLabelComponentCode, AppConstant.UI_LABEL_TEXT);
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

    printManifesto(pickId: string) {

        var manifesto: MenifestoInfo;
        this.driverDashboardService.getManifestoData(pickId).subscribe(response => {
            if (response && response.menifestoInfoId) {
                manifesto = response;
                this.generateReport(response);
            } else {
                this.utilService.showSnackbar('Manifesto is not generated yet', 3000);
            }
        })
    }

    generateReport(menifesto: MenifestoInfo) {
        debugger
        var menifestReportCallData: MenifestReportCallData = this.prepareReportGenData(menifesto);

        // var generatedDataKeys: string[] = Object.keys(menifestReportCallData);
        // var mockDataKeys: string[] = Object.keys(this.reportData);

        // generatedDataKeys.forEach((eachGenKey, index) => {

        //     if (eachGenKey != mockDataKeys[index]) {
        //         console.log('mockKey: ' + mockDataKeys[index] + ', genKey: ' + eachGenKey);
        //     }

        // });


        this.driverDashboardService.generateReport(menifestReportCallData);
    }


    prepareMenifestoWasteData(tripDefs: MenifestoTripDef[], pickList: PickInfo[]): MenifestoWaste[] {
        var menifestoWasteList: MenifestoWaste[] = [];
        var totalQuantity = 0;
        pickList.forEach(each => {
            totalQuantity += each.quantity;
        });
        tripDefs.forEach(tripDef => {
            tripDef.projectList.forEach(eachProject => {
                eachProject.wasteIdList.forEach(eachWaste => {
                    var menifestoWaste: MenifestoWaste = {
                        wasteItem: eachWaste.wasteTitle,
                        unit: eachWaste.unitDef,
                        shape: eachWaste.wasteShape,
                        packing: eachWaste.wastePackage,
                        quantity: totalQuantity
                    }

                    menifestoWasteList.push(menifestoWaste);
                });
            });
        });
        return menifestoWasteList;
    }

    prepareMenifestoWasteDataFromManualManifestoData(manifestoProcessWasteInfo: ManifestoProcessWasteInfo[]): MenifestoWaste[] {
        var menifestoWasteList: MenifestoWaste[] = [];

        manifestoProcessWasteInfo.forEach(eachWaste => {
            var menifestoWaste: MenifestoWaste = {
                wasteItem: eachWaste.wasteName,
                unit: eachWaste.unit,
                shape: eachWaste.shape,
                packing: eachWaste.wastePackage,
                quantity: eachWaste.quantity
            }

            menifestoWasteList.push(menifestoWaste);
        });

        return menifestoWasteList;
    }

    prepareMenifestoWasteDisposalLocation(pickDef: PickInfo[]): string {
        var finalDisposalLocation: string = pickDef[0].disposalInfo.dropZipCode + ',' + pickDef[0].disposalInfo.dropLocation;
        return finalDisposalLocation;
    }

    prepareReportGenData(menifesto: MenifestoInfo): MenifestReportCallData {

        var menifestReportCallData: MenifestReportCallData = {} as MenifestReportCallData;

        menifestReportCallData.designFile = AppConstant.MANIFESTO_REPORT_FILE_NAME;
        menifestReportCallData.outputName = AppConstant.MANIFESTO_REPORT_TYPE;
        menifestReportCallData.format = AppConstant.REPORT_FILE_FORMAT_PDF;
        menifestReportCallData.parameters = {} as MenifestReportData;

        var date: string = menifesto.dateView.substring(0, menifesto.dateView.indexOf(" "));

        menifestReportCallData.parameters = {
            title: this.manifestoReportLabel.title,
            refLabel: this.manifestoReportLabel.refLabel,
            refNo: '1234',
            dateLabel: this.manifestoReportLabel.dateLabel,
            date: date,
            manifestoLabel: this.manifestoReportLabel.manifestoLabel,
            manifestoNo: menifesto.menifestoUniqueId,
            issuersName: menifesto.aggrementInfo.dumperPartnerInfo.companyName,
            issuersNameLabel: this.manifestoReportLabel.issuersNameLabel,
            numberLabel: this.manifestoReportLabel.numberLabel,
            numberValue: '001',
            dateValue: date,
            dumperCompanyInfoLabel: this.manifestoReportLabel.dumperCompanyInfoLabel,
            dumperCompanyNameLabel: this.manifestoReportLabel.dumperCompanyNameLabel,
            companyName: '',
            address: '',
            addressLabel: this.manifestoReportLabel.addressLabel,
            personLabel: this.manifestoReportLabel.personLabel,
            personInCharge: '',
            contactNoLabel: this.manifestoReportLabel.contactNoLabel,
            dumperCompanyContactNo: '',
            pickLocationContactNo: '',
            wastepickLocation: '',
            pickLocationInCharge: '',
            sightInfoLabel: this.manifestoReportLabel.sightInfoLabel,
            confirmationDateLabel: this.manifestoReportLabel.confirmationDateLabel,
            sealAndSignLabel: this.manifestoReportLabel.sealAndSignLabel,
            dumperHandOverDate: menifesto.manualManifesto.dateView.substring(0, menifesto.manualManifesto.dateView.indexOf(" ")),
            loadDateB1: menifesto.manualManifesto.transportInfo.transportComplateDateView.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateView.indexOf(" ")),
            transportComplateDate: menifesto.manualManifesto.transportInfo.transportComplateDateB2View.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateB2View.indexOf(" ")),
            receiveComplateDate: menifesto.manualManifesto.processorInfo.processingComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateView.indexOf(" ")),
            processComplatedateC2: menifesto.manualManifesto.processorInfo.processingComplateDateC2View.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateC2View.indexOf(" ")),
            processComplateDate: menifesto.manualManifesto.processorInfo.disposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.disposeComplateDateView.indexOf(" ")),
            finalDisposalDate: menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.indexOf(" ")),
            tableHeaderLabel: this.manifestoReportLabel.tableHeaderLabel,
            unitlabel: this.manifestoReportLabel.unitlabel,
            manifestoData: '',
            userNameLabel: this.manifestoReportLabel.userNameLabel,
            intermediateProcessingWaste: this.manifestoReportLabel.intermediateProcessingWaste,
            finalDisposalLocation: '',
            finalDisposalLocationlabel: this.manifestoReportLabel.finalDisposalLocationlabel,
            locationName: '',
            locationNameLabel: this.manifestoReportLabel.locationNameLabel,
            transporter1Label: this.manifestoReportLabel.transporter1Label,
            transporter2Label: this.manifestoReportLabel.transporter2Label,
            transporterCompanyNameLabel: this.manifestoReportLabel.transporterCompanyNameLabel,
            disposalContactorLabel: this.manifestoReportLabel.disposalContactorLabel,
            transhipmentLabel: this.manifestoReportLabel.transhipmentLabel,
            consignment1Label: this.manifestoReportLabel.consignment1Label,
            consignment2Label: this.manifestoReportLabel.consignment2Label,
            consignmentDisposalLabel: this.manifestoReportLabel.consignmentDisposalLabel,
            finalDisposalDateLabel: this.manifestoReportLabel.finalDisposalDateLabel,
            additionalInfoLabel: this.manifestoReportLabel.additionalInfoLabel,
            additionalInfo: menifesto.manualManifesto.additionalInfo,
            userName: '',
            processingWaste: 'None',
            transporterAddress: '',
            transporterCompanyName: '',
            transportCompanyContactNo: '',
            transportInCharge: '',
            processorCompanyAddress: '',
            processorCompanyContactNo: '',
            menifestoStatus: menifesto.menifestoStatus,
            serialNumberLabel: this.manifestoReportLabel.serialNumberLabel,
            wasteItemLabel: this.manifestoReportLabel.wasteItemLabel,
            tableUnitLabel: this.manifestoReportLabel.tableUnitLabel,
            shapeLabel: this.manifestoReportLabel.shapeLabel,
            packingLabel: this.manifestoReportLabel.packingLabel,
            quanitityLabel: this.manifestoReportLabel.quanitityLabel,
        }

        var dumper: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var transporter: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var processor: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        menifestReportCallData.parameters.issuersName = dumper.personInChargeName;
        menifestReportCallData.parameters.companyName = dumper.companyName;
        menifestReportCallData.parameters.address = dumper.companyZipCode + ',' + dumper.companyAddress;
        menifestReportCallData.parameters.personInCharge = dumper.personInChargeName;
        menifestReportCallData.parameters.dumperCompanyContactNo = dumper.contactNo;
        menifestReportCallData.parameters.pickLocationContactNo = dumper.contactNo;
        menifestReportCallData.parameters.wastepickLocation = dumper.companyZipCode + ',' + dumper.companyAddress;
        menifestReportCallData.parameters.pickLocationInCharge = dumper.personInChargeName;
        menifestReportCallData.parameters.userName = dumper.personInChargeName;
        // menifestReportCallData.parameters.sightAddress = dumper.companyZipCode + ',' + dumper.companyAddress;

        if (!menifesto.manualManifesto.dateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.dumperHandOverDate = date
        } else if (!menifesto.manualManifesto.dateView) {
            menifestReportCallData.parameters.dumperHandOverDate = 'Not Given'
        }

        if (!menifesto.manualManifesto.transportInfo.transportComplateDateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.loadDateB1 = date

        } else if (!menifesto.manualManifesto.transportInfo.transportComplateDateView) {
            menifestReportCallData.parameters.loadDateB1 = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.transportInfo.transportComplateDateB2View && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.transportComplateDate = date

        // } else
        if (!menifesto.manualManifesto.transportInfo.transportComplateDateB2View) {
            menifestReportCallData.parameters.transportComplateDate = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.processorInfo.processingComplateDateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.receiveComplateDate = date

        // } else
        if (!menifesto.manualManifesto.processorInfo.processingComplateDateView) {
            menifestReportCallData.parameters.receiveComplateDate = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.processorInfo.processingComplateDateC2View && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.processComplatedateC2 = date

        // } else
        if (!menifesto.manualManifesto.processorInfo.processingComplateDateC2View) {
            menifestReportCallData.parameters.processComplatedateC2 = 'Not Complated'
        }

        if (!menifesto.manualManifesto.processorInfo.disposeComplateDateView) {
            menifestReportCallData.parameters.processComplateDate = 'Not Complated'
        }

        if (!menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView) {
            menifestReportCallData.parameters.finalDisposalDate = 'Not Complated'
        }

        if (!menifesto.manualManifesto.additionalInfo) {
            menifestReportCallData.parameters.additionalInfo = 'None'
        }

        if (menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.manifestoData = JSON.stringify(this.prepareMenifestoWasteData(menifesto.tripIdDef, menifesto.pickIdDef));
            menifestReportCallData.parameters.finalDisposalLocation = this.prepareMenifestoWasteDisposalLocation(menifesto.pickIdDef);
            menifestReportCallData.parameters.locationName = this.prepareMenifestoWasteDisposalLocation(menifesto.pickIdDef);
        } else {
            menifestReportCallData.parameters.manifestoData = JSON.stringify(this.prepareMenifestoWasteDataFromManualManifestoData(menifesto.manualManifesto.manifestoProcessWasteInfo));
            menifestReportCallData.parameters.finalDisposalLocation = menifesto.manualManifesto.dumperInfo.workZip + ', ' + menifesto.manualManifesto.dumperInfo.workAddress;
            menifestReportCallData.parameters.locationName = (menifesto.manualManifesto.dumperInfo.workPlace) ? menifesto.manualManifesto.dumperInfo.workPlace : "Not found";
        }



        menifestReportCallData.parameters.transportInCharge = transporter.personInChargeName;
        menifestReportCallData.parameters.transporterCompanyName = transporter.companyName;
        menifestReportCallData.parameters.transporterAddress = transporter.companyZipCode + ',' + transporter.companyAddress;
        menifestReportCallData.parameters.transportCompanyContactNo = transporter.contactNo;


        menifestReportCallData.parameters.processorCompanyAddress = processor.companyZipCode + ',' + transporter.companyAddress;
        menifestReportCallData.parameters.processorCompanyContactNo = processor.contactNo;

        menifestReportCallData.wrapError = true;

        return menifestReportCallData;
    }
}
