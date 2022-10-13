import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo, AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { ScaleSettingInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfo, CompanyTripFetch, DriverTripFetch, DriverTripPlan, DumpingEmissionInfo, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, ProcessorEmissionInfo, TripQrData, WasteWisePickPackageInfo, WeightCertificateInfo, WeightCertificateReportData, WeightCertificateReportParameter, WeightCertificateWaste } from 'src/app/models/backend-fetch/driver-op';
import { ManifestoProcessWasteInfo, MenifestoInfo, MenifestoTripDef, MenifestoWaste, MenifestReportCallData, MenifestReportData } from 'src/app/models/backend-fetch/menifest';
import { environment } from 'src/environments/environment';
import { UriService } from '../visitor-services/uri.service';
import { UtilService } from '../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})
export class DriverDashboardService {


    constructor(private uriService: UriService, public toastController: ToastController, private httpClient: HttpClient, private utilService: UtilService) { }

    driverTripPlan: DriverTripPlan[] = []

    prepareProcessingEmissionData(loadPackageView: LoadPackageView, driverTripPlan: DriverTripPlan, companyId: string): ProcessorEmissionInfo[] {

        var processingEmissionInfoList: ProcessorEmissionInfo[] = [];

        if (loadPackageView && loadPackageView.wasteWisePickPackageList) {
            loadPackageView.wasteWisePickPackageList.forEach(eachWaste => {

                if (eachWaste && eachWaste.pickList) {
                    eachWaste.pickList.forEach(eachPick => {
                        var id: string = this.utilService.generateUniqueId();

                        var processingEmissionInfo: ProcessorEmissionInfo = {
                            processingEmissionId: id,
                            companyId: companyId,
                            quantity: eachPick.pick.quantity,
                            dateTime: driverTripPlan.pickUpDate,
                            wasteItemId: eachWaste.wasteId,
                            wasteTitle: eachWaste.wasteTitle,
                            unit: eachPick.pick.disposalInfo.unit,
                            pickId: eachPick.pick.pickId,
                            projectInfoId: eachPick.pick.projetId
                        }

                        processingEmissionInfoList.push(processingEmissionInfo);
                    });
                }
            });
        }

        return processingEmissionInfoList;
    }

    downloadReport(reportData: any) {

        var url = this.BASE_URL + '/menifesto/generate-report';
        var url = 'www.dxrreleases.com//menifesto/generate-report';

        this.httpClient.post(url, reportData, {
            responseType: 'blob'
        }).subscribe((res) => {
            if (res) {
                let blob = new Blob([res], { type: 'application/pdf' });
                let pdfUrl = window.URL.createObjectURL(blob);

                var PDF_link = document.createElement('a');
                PDF_link.href = pdfUrl;

                //   TO OPEN PDF ON BROWSER IN NEW TAB
                window.open(pdfUrl, '_blank');
                //   TO DOWNLOAD PDF TO YOUR COMPUTER
                // PDF_link.download = "TestFile.pdf";
                // PDF_link.click();
            }
        })
    }

    getManifestoData(pickId: string): Observable<MenifestoInfo> {
        var url = '/mob/menifesto/get-menifesto-by-pick';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickId);
    }

    getWeightCertificateInfo(pickIdList: string[]): Observable<WeightCertificateInfo> {
        var url = '/mob/load/get-weight-cert';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickIdList.join('|'));
    }

    getCompanyTrip(driverTripFetch: CompanyTripFetch, callBack: any) {
        var url = '/mob/load/company-trip-plan';

        this.getFormatedDate(driverTripFetch.date).subscribe(response => {
            if (response && response.date) {
                driverTripFetch.date = response.date

                this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripFetch).subscribe(data => {
                    callBack(data);
                });
            }
        });

    }

    getDriverTrip(driverTripFetch: DriverTripFetch, callBack: any) {
        var url = '/mob/load/trip-plan';

        this.getFormatedDate(driverTripFetch.date).subscribe(response => {
            if (response && response.date) {
                driverTripFetch.date = response.date

                this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripFetch).subscribe(data => {
                    callBack(data);
                });
            }
        });

    }

    groupBy(xs: PickInfo[], key: string): any {

        return xs.reduce(function (rv, x) {
            (rv[x.disposalInfo[key]] = rv[x.disposalInfo[key]] || []).push(x);
            return rv;
        }, {});
    }

    getPickListFromWastewisePick(wastewisePickPackage: PickWisePackage[]) {
        var pickList: PickInfo[] = [];


        wastewisePickPackage.forEach(eachPick => {
            pickList.push(eachPick.pick);
        });


        return pickList;
    }

    groupByProjectId(xs: PickInfo[]): any {

        return xs.reduce(function (rv, x) {
            (rv[x.projetId + '|' + x.projectTitle] = rv[x.projetId] || []).push(x);
            return rv;
        }, {});
    }

    getTripInfo(tripInfoId: string): Observable<DriverTripPlan> {
        var url = '/mob/load/scanned-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripInfoId);
    }

    getPartnerCompanyInfo(companyId: string): Observable<CompanyInfo> {
        var url = '/mob/load/partner-com-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    savePackageDef(newPackage: PackageInfo): Observable<PackageInfo> {
        var url = '/mob/load/save-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newPackage);
    }

    getPickPackageDefList(pickId: string): Observable<PackageInfo[]> {
        var url = '/mob/load/get-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickId);
    }

    getTripPackageDefList(tripId: string): Observable<PackageInfo[]> {
        var url = '/mob/load/get-trip-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripId);
    }

    getHandoverPackageDefList(handoverPickIds: string[]): Observable<PackageInfo[]> {
        var url = '/mob/load/get-handover-packages';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    confirmHandover(handoverPickIds: string[]): Observable<PickInfo[]> {
        var url = '/mob/load/confirm-handover-picks';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    getCurrentDate(): Observable<any> {
        var url = '/mob/load/current-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    getFormatedDate(engDate: string): Observable<any> {
        var url = '/mob/load/format-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, engDate);
    }

    confirmReceivedWeight(pickList: PickInfo[]): Observable<string> {
        var url = '/mob/load/confirm-received-weight';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickList);
    }

    confirmUnload(handoverPickIds: string[]): Observable<PickInfo[]> {
        var url = '/mob/load/confirm-unload-picks';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    saveDumpingEmissionInfo(dumpingEmissionInfo: DumpingEmissionInfo[]): Observable<any> {
        var url = '/carbon/load-items';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, dumpingEmissionInfo);
    }

    saveProcessorEmissionInfo(processorEmissionInfo: ProcessorEmissionInfo[]): Observable<any> {
        var url = '/carbon/unload-items';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, processorEmissionInfo);
    }

    saveMenifestoUnloadStatus(handoverPickIds: string[]): Observable<string[]> {
        var url = '/mob/menifesto/menifesto-unload';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    async presentToast(msg: string, duration: number) {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position: 'top',
        });
        toast.present();
    }

    preparePackageInfo(selectedTrip: DriverTripPlan, scannedPackgeInfo: PackageInfo[], transporterCompanyInfo: CompanyInfo, otherCompanyInfo: CompanyInfo) {

        var loadPackage: LoadPackageView = {
            dumperInfo: otherCompanyInfo,
            transporterInfo: transporterCompanyInfo,
            wasteWisePickPackageList: []
        };

        selectedTrip.pickList.forEach(eachPick => {
            var pickWisePackage: PickWisePackage = {
                packageList: [],
                pick: eachPick,
                calculatedQunatity: eachPick.declaredQunatity
            };
            var wasteWisePickPackageInfo: WasteWisePickPackageInfo = {
                wasteId: eachPick.disposalInfo.wasteItemId,
                wasteTitle: eachPick.disposalInfo.wasteItemName,
                pickList: [],
                totalQunatity: 0,
                totalDeclaredQunatity: 0
            }
            scannedPackgeInfo.forEach(eachPackage => {

                if (eachPackage.pickId == eachPick.pickId) {
                    pickWisePackage.packageList.push(eachPackage);
                }

            });

            if (pickWisePackage.packageList.length > 0) {

                var index = loadPackage.wasteWisePickPackageList.findIndex(item => item.wasteId == eachPick.disposalInfo.wasteItemId);

                if (index >= 0) {

                    loadPackage.wasteWisePickPackageList[index].pickList.push(pickWisePackage);
                    loadPackage.wasteWisePickPackageList[index].totalQunatity += pickWisePackage.pick.quantity;
                    loadPackage.wasteWisePickPackageList[index].totalDeclaredQunatity += pickWisePackage.pick.declaredQunatity;

                } else {

                    wasteWisePickPackageInfo.pickList.push(pickWisePackage);

                    wasteWisePickPackageInfo.totalQunatity = pickWisePackage.pick.quantity;
                    wasteWisePickPackageInfo.totalDeclaredQunatity = pickWisePackage.pick.declaredQunatity;

                    loadPackage.wasteWisePickPackageList.push(wasteWisePickPackageInfo);
                }
            }

        });

        return loadPackage;
    }

    generateWasteHandoverQrCodeFromPickWisePackage(pickWisePackageList: PickWisePackage[], tripInfoId: string, companyId: string) {
        var handoverWastePickAndPackage: HandoverWastePickAndPackage = {
            companyId: companyId,
            tripInfoId: tripInfoId,
            pickIdList: [],

        }

        pickWisePackageList.forEach(element => {
            handoverWastePickAndPackage.pickIdList.push(element.pick.pickId);
        });

        return handoverWastePickAndPackage;
    }

    generateWasteHandoverQrCodeFromPickList(pickList: any[], tripInfoId: string, companyId: string) {
        var handoverWastePickAndPackage: HandoverWastePickAndPackage = {
            companyId: companyId,
            tripInfoId: tripInfoId,
            pickIdList: [],

        }

        pickList.forEach(element => {
            handoverWastePickAndPackage.pickIdList.push(element.pickId);
        });

        return handoverWastePickAndPackage;
    }

    getCompanyScaleList(companyId: string): Observable<ScaleSettingInfo[]> {
        var url = '/company-settings/scale-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    saveWeightCertificateInfo(weightCertificateInfoForSave: WeightCertificateInfo): Observable<WeightCertificateInfo> {
        var url = '/mob/load/save-weight-cert';

        var weightCertificateInfo: any = {};
        weightCertificateInfo.weightCertificateInfoId = weightCertificateInfoForSave.weightCertificateInfoId;
        weightCertificateInfo.date = weightCertificateInfoForSave.date;
        weightCertificateInfo.dateView = weightCertificateInfoForSave.dateView;
        weightCertificateInfo.tripId = weightCertificateInfoForSave.tripId;
        weightCertificateInfo.pickList = weightCertificateInfoForSave.pickList;
        weightCertificateInfo.wasteGrossWeight = weightCertificateInfoForSave.wasteGrossWeight;
        weightCertificateInfo.vehicleWeight = weightCertificateInfoForSave.vehicleWeight;
        weightCertificateInfo.wasteNetWeight = weightCertificateInfoForSave.wasteNetWeight;
        weightCertificateInfo.scaleInfo = JSON.stringify(weightCertificateInfoForSave.scaleInfo);
        weightCertificateInfo.processorCompanyInfo = JSON.stringify(weightCertificateInfoForSave.processorCompanyInfo);
        weightCertificateInfo.transporterCompanyInfo = JSON.stringify(weightCertificateInfoForSave.transporterCompanyInfo);
        weightCertificateInfo.driverInfo = JSON.stringify(weightCertificateInfoForSave.driverInfo);
        weightCertificateInfo.wasteList = JSON.stringify(weightCertificateInfoForSave.wasteList);

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, weightCertificateInfo);
    }

    BASE_URL: string = environment.serverUrl;

    generateReport(reportData: any) {

        console.log(JSON.stringify(reportData));

        var url = this.BASE_URL + '/web/menifesto/generate-report';
        // var url = 'https://www.dxrreleases.com/web/menifesto/generate-report';

        this.httpClient.post(url, reportData, {
            responseType: 'blob'
        }).subscribe((res) => {
            if (res) {
                let blob = new Blob([res], { type: 'application/pdf' });
                let pdfUrl = window.URL.createObjectURL(blob);

                var PDF_link = document.createElement('a');
                PDF_link.href = pdfUrl;

                //   TO OPEN PDF ON BROWSER IN NEW TAB
                window.open(pdfUrl, '_blank');
                //   TO DOWNLOAD PDF TO YOUR COMPUTER
                // PDF_link.download = "TestFile.pdf";
                // PDF_link.click();
            }
        })
    }

    getDateAsFrontendFormat(date: string): Observable<any> {
        var url = '/util/get-date-view';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, date);

    }

    prepareWeightCertificateData(weightCertificateInfo: WeightCertificateInfo, uiLabels: any): WeightCertificateReportData {

        var weightCertificateData: WeightCertificateReportData = {
            designFile: AppConstant.WEIGHT_CERTIFICATE_DESIGN_FILE,
            outputName: AppConstant.WEIGHT_CERTIFICATE_OUTPUT_NAME,
            format: AppConstant.WEIGHT_CERTIFICATE_FORMAT_PDF,
            parameters: {} as WeightCertificateReportParameter,
            wrapError: true
        }

        var companySealFileExtention = "";
        var userSealFileExtention = "";

        if (weightCertificateInfo.processorCompanyInfo.companySeal && weightCertificateInfo.processorCompanyInfo.companySeal.startsWith(AppConstant.BASE64_STRING_PREFIX)) {
            companySealFileExtention = weightCertificateInfo.processorCompanyInfo.companySeal.split(";")[0].split("/")[1];
        }
        var companySealPath = environment.reportSealPath + weightCertificateInfo.processorCompanyInfo.companyId + AppConstant.COMPANY_SEAL_FILE_NAME_SUFFIX + companySealFileExtention;


        if (weightCertificateInfo.scaleInfo.personSeal && weightCertificateInfo.scaleInfo.personSeal.startsWith(AppConstant.BASE64_STRING_PREFIX)) {
            userSealFileExtention = weightCertificateInfo.scaleInfo.personSeal.split(";")[0].split("/")[1];
        }
        var userSealPath = environment.reportSealPath + weightCertificateInfo.scaleInfo.responsiblePersonId + AppConstant.USER_SEAL_FILE_NAME_SUFFIX + userSealFileExtention;

        const weightCertificateReportParameter: WeightCertificateReportParameter = {
            weightCertificateLabel: uiLabels.weightCertificateLabel,
            date: weightCertificateInfo.dateView,
            licenseLabel: uiLabels.licenseLabel,
            transporterName: weightCertificateInfo.transporterCompanyInfo.companyName,
            transporterNameLabel: uiLabels.transporterNameLabel,
            vehicleNameNumber: weightCertificateInfo.driverInfo.vehicleInfo.vehicleRegNo,
            vehicleNameNumberLabel: uiLabels.vehicleNameNumberLabel,
            gorssWeightlabel: uiLabels.gorssWeightlabel,
            wasteTruckWeight: weightCertificateInfo.wasteGrossWeight.toString(),
            wasteTrackLabel: uiLabels.wasteTrackLabel,
            onlyTruckWeight: weightCertificateInfo.vehicleWeight.toString(),
            truckWeightLabel: uiLabels.truckWeightLabel,
            weightCertificateData: '',
            totalLabel: uiLabels.totalLabel,
            remarksLabel: uiLabels.remarksLabel,
            signLabel: uiLabels.signLabel,
            nameLabel: uiLabels.nameLabel,
            performanceLabel: uiLabels.performanceLabel,
            equipmentLabel: uiLabels.equipmentLabel,
            quintityLabel: uiLabels.quintityLabel,
            nameValue: weightCertificateInfo.scaleInfo.nameOfScale,
            performanceValue: weightCertificateInfo.scaleInfo.capacity.toString(),
            equipmentValue: weightCertificateInfo.scaleInfo.scaleNumber,
            quantityValue: weightCertificateInfo.scaleInfo.quantity.toString(),
            processorName: weightCertificateInfo.processorCompanyInfo.companyName,
            fullAddress: weightCertificateInfo.processorCompanyInfo.companyZipCode + ', ' + weightCertificateInfo.transporterCompanyInfo.companyAddress,
            // reciptionistName: "Rakib",
            reciptionistName: weightCertificateInfo.scaleInfo.personName,
            telLabel: uiLabels.telLabel,
            // telvalue: "123456789",
            telvalue: weightCertificateInfo.scaleInfo.personContact,
            faxLabel: uiLabels.faxLabel,
            faxValue: "1234",
            // faxValue: weightCertificateInfo.scaleInfo.personEmail,
            compNameLabel: uiLabels.compNameLabel,
            compAddressLabel: uiLabels.compAddressLabel,
            reciepsonistNameLabel: uiLabels.reciepsonistNameLabel,
            companySealsLabel: uiLabels.companySealsLabel,
            receipsonistSealLabel: uiLabels.receipsonistSealLabel,
            companySealphoto: companySealPath,
            recipsonistSealPhoto: userSealPath,
            wasteItemLabel: uiLabels.wasteItemLabel,
            adjaustmentLabel: uiLabels.adjaustmentLabel,
            containerLabel: uiLabels.containerLabel,
            netWeightLabel: uiLabels.netWeightLabel,
        }

        weightCertificateReportParameter.weightCertificateData = JSON.stringify(this.prepareWeightCertificateWasteList(weightCertificateInfo.wasteList));

        weightCertificateData.parameters = weightCertificateReportParameter;

        return weightCertificateData;
    }

    prepareWeightCertificateWasteList(wasteList: WasteWisePickPackageInfo[]) {

        var certificateWasteList: WeightCertificateWaste[] = [];

        wasteList.forEach(element => {

            var totalDeclaredQunatity: number = 0;
            element.pickList.forEach(eachPick => {
                totalDeclaredQunatity += eachPick.pick.declaredQunatity;
            })

            var certificateWaste: WeightCertificateWaste = {
                productName: element.wasteTitle,
                adjustment: (totalDeclaredQunatity - element.totalQunatity).toFixed(2),
                container: element.totalQunatity.toString(),
                netWeight: totalDeclaredQunatity.toString()
            }

            certificateWasteList.push(certificateWaste);
        });

        return certificateWasteList;
    }

    prepareReportGenData(menifesto: MenifestoInfo, manifestoReportLabel: any): MenifestReportCallData {

        var menifestReportCallData: MenifestReportCallData = {} as MenifestReportCallData;

        menifestReportCallData.designFile = AppConstant.MANIFESTO_REPORT_FILE_NAME;
        menifestReportCallData.outputName = AppConstant.MANIFESTO_REPORT_TYPE;
        menifestReportCallData.format = AppConstant.REPORT_FILE_FORMAT_PDF;
        menifestReportCallData.parameters = {} as MenifestReportData;

        var date: string = menifesto.dateView.substring(0, menifesto.dateView.indexOf(" "));

        menifestReportCallData.parameters = {
            title: manifestoReportLabel.title,
            refLabel: manifestoReportLabel.refLabel,
            refNo: '1234',
            dateLabel: manifestoReportLabel.dateLabel,
            date: date,
            manifestoLabel: manifestoReportLabel.manifestoLabel,
            manifestoNo: menifesto.menifestoUniqueId,
            issuersName: menifesto.aggrementInfo.dumperPartnerInfo.companyName,
            issuersNameLabel: manifestoReportLabel.issuersNameLabel,
            numberLabel: manifestoReportLabel.numberLabel,
            numberValue: '001',
            dateValue: date,
            dumperCompanyInfoLabel: manifestoReportLabel.dumperCompanyInfoLabel,
            dumperCompanyNameLabel: manifestoReportLabel.dumperCompanyNameLabel,
            companyName: '',
            address: '',
            addressLabel: manifestoReportLabel.addressLabel,
            personLabel: manifestoReportLabel.personLabel,
            personInCharge: '',
            contactNoLabel: manifestoReportLabel.contactNoLabel,
            dumperCompanyContactNo: '',
            pickLocationContactNo: '',
            wastepickLocation: '',
            pickLocationInCharge: '',
            sightInfoLabel: manifestoReportLabel.sightInfoLabel,
            confirmationDateLabel: manifestoReportLabel.confirmationDateLabel,
            sealAndSignLabel: manifestoReportLabel.sealAndSignLabel,
            dumperHandOverDate: menifesto.manualManifesto.dateView.substring(0, menifesto.manualManifesto.dateView.indexOf(" ")),
            loadDateB1: menifesto.manualManifesto.transportInfo.transportComplateDateView.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateView.indexOf(" ")),
            transportComplateDate: menifesto.manualManifesto.transportInfo.transportComplateDateB2View.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateB2View.indexOf(" ")),
            receiveComplateDate: menifesto.manualManifesto.processorInfo.processingComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateView.indexOf(" ")),
            processComplatedateC2: menifesto.manualManifesto.processorInfo.processingComplateDateC2View.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateC2View.indexOf(" ")),
            processComplateDate: menifesto.manualManifesto.processorInfo.disposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.disposeComplateDateView.indexOf(" ")),
            finalDisposalDate: menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.indexOf(" ")),
            tableHeaderLabel: manifestoReportLabel.tableHeaderLabel,
            unitlabel: manifestoReportLabel.unitlabel,
            manifestoData: '',
            userNameLabel: manifestoReportLabel.userNameLabel,
            intermediateProcessingWaste: manifestoReportLabel.intermediateProcessingWaste,
            finalDisposalLocation: '',
            finalDisposalLocationlabel: manifestoReportLabel.finalDisposalLocationlabel,
            locationName: '',
            locationNameLabel: manifestoReportLabel.locationNameLabel,
            transporter1Label: manifestoReportLabel.transporter1Label,
            transporter2Label: manifestoReportLabel.transporter2Label,
            transporterCompanyNameLabel: manifestoReportLabel.transporterCompanyNameLabel,
            disposalContactorLabel: manifestoReportLabel.disposalContactorLabel,
            transhipmentLabel: manifestoReportLabel.transhipmentLabel,
            consignment1Label: manifestoReportLabel.consignment1Label,
            consignment2Label: manifestoReportLabel.consignment2Label,
            consignmentDisposalLabel: manifestoReportLabel.consignmentDisposalLabel,
            finalDisposalDateLabel: manifestoReportLabel.finalDisposalDateLabel,
            additionalInfoLabel: manifestoReportLabel.additionalInfoLabel,
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
            serialNumberLabel: manifestoReportLabel.serialNumberLabel,
            wasteItemLabel: manifestoReportLabel.wasteItemLabel,
            tableUnitLabel: manifestoReportLabel.tableUnitLabel,
            shapeLabel: manifestoReportLabel.shapeLabel,
            packingLabel: manifestoReportLabel.packingLabel,
            quanitityLabel: manifestoReportLabel.quanitityLabel,
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

    driverCompanyInfo: CompanyInfo;

    loadPackage: LoadPackageView;
}


        // {
        //     tripInfoId: 'trip0001',
        //     pickUpDate: '2022040510000000',
        //     pickUpDateView: '2022040510000000',
        //     startTime: '07:00',
        //     endTime: '12:00',
        //     driverId: 'driver0001',
        //     driverName: "Rakib",
        //     driverLicenseNo: "DL-387493",
        //     pickList: [
        //         {
        //             pickId: 'pick0001',
        //             quantity: 2,
        //             tripId: 'trip0001',
        //             projectTitle: 'DX-R Project',
        //             projetId: 'DX-R Project',
        //             loadStatus: "0",
        //             declaredQunatity: 2,
        //             disposalInfo: {
        //                 disposalInfoId: "",
        //                 disposalViewId: "",
        //                 collectionId: "",
        //                 wasteTypeId: "",
        //                 wasteTypeName: "",
        //                 wasteItemId: "waste001",
        //                 wasteItemName: "Coal",
        //                 fromDate: "",
        //                 toDate: "",
        //                 quantity: 0,
        //                 pickLocation: "Mirpur",
        //                 pickZipCode: "120000",
        //                 dropLocation: "",
        //                 dropZipCode: "",
        //                 unit: "",
        //                 price: 0,
        //                 isParent: false,
        //                 wasteShape: '',
        //                 wastePackage: ''
        //             }
        //         },
        //         {
        //             pickId: 'pick0002',
        //             quantity: 2,
        //             tripId: 'trip0001',
        //             projectTitle: 'DX-R Project',
        //             projetId: 'DX-R Project',
        //             loadStatus: "0",
        //             declaredQunatity: 2,
        //             disposalInfo: {
        //                 disposalInfoId: "",
        //                 disposalViewId: "",
        //                 collectionId: "",
        //                 wasteTypeId: "",
        //                 wasteTypeName: "",
        //                 wasteItemId: "waste002",
        //                 wasteItemName: "Iron Scrap",
        //                 fromDate: "",
        //                 toDate: "",
        //                 quantity: 0,
        //                 pickLocation: "Mirpur",
        //                 pickZipCode: "120000",
        //                 dropLocation: "",
        //                 dropZipCode: "",
        //                 unit: "",
        //                 price: 0,
        //                 isParent: false,
        //                 wasteShape: '',
        //                 wastePackage: ''
        //             }
        //         },
        //         {
        //             pickId: 'pick0003',
        //             quantity: 2,
        //             tripId: 'trip0001',
        //             projectTitle: 'DX-R Project',
        //             projetId: 'DX-R Project',
        //             loadStatus: "0",
        //             declaredQunatity: 2,
        //             disposalInfo: {
        //                 disposalInfoId: "",
        //                 disposalViewId: "",
        //                 collectionId: "",
        //                 wasteTypeId: "",
        //                 wasteTypeName: "",
        //                 wasteItemId: "waste001",
        //                 wasteItemName: "Chemical",
        //                 fromDate: "",
        //                 toDate: "",
        //                 quantity: 0,
        //                 pickLocation: "Mirpur",
        //                 pickZipCode: "120000",
        //                 dropLocation: "",
        //                 dropZipCode: "",
        //                 unit: "",
        //                 price: 0,
        //                 isParent: false,
        //                 wasteShape: '',
        //                 wastePackage: ''
        //             }
        //         },
        //         {
        //             pickId: 'pick0004',
        //             quantity: 2,
        //             tripId: 'trip0001',
        //             projectTitle: 'DX-R Project',
        //             projetId: 'DX-R Project',
        //             loadStatus: "0",
        //             declaredQunatity: 2,
        //             disposalInfo: {
        //                 disposalInfoId: "",
        //                 disposalViewId: "",
        //                 collectionId: "",
        //                 wasteTypeId: "",
        //                 wasteTypeName: "",
        //                 wasteItemId: "waste003",
        //                 wasteItemName: "Iron Scrap",
        //                 fromDate: "",
        //                 toDate: "",
        //                 quantity: 0,
        //                 pickLocation: "Pallabi",
        //                 pickZipCode: "120002",
        //                 dropLocation: "",
        //                 dropZipCode: "",
        //                 unit: "",
        //                 price: 0,
        //                 isParent: false,
        //                 wasteShape: '',
        //                 wastePackage:''
        //             }
        //         }
        //     ],
        //     vehicleInfo: {
        //         companyId: "",
        //         vehicleId: "",
        //         frontendDate: "",
        //         backendDate: "",
        //         manufacturerName: "Tesla",
        //         vehicleType: "Truck",
        //         modelName: "",
        //         vehicleRegNo: "TH-3763231",
        //         vehicleCapacity: "10",
        //         vehicleWeight: "",
        //         gasolineType: [],
        //         inspectionDate: "",
        //         vehicleOwnerShip: [],
        //         zipcode: "",
        //         zipcodeFormated: '',
        //         officeAddress: "",
        //         fitnessLicense: "",
        //         remarks: ""
        //     }
        // }