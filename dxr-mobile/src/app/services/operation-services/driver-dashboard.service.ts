import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';
import { ScaleSettingInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfo, CompanyTripFetch, DriverTripFetch, DriverTripPlan, DumpingEmissionInfo, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, ProcessorEmissionInfo, TripQrData, WasteWisePickPackageInfo, WeightCertificateInfo, WeightCertificateReportData, WeightCertificateReportParameter, WeightCertificateWaste } from 'src/app/models/backend-fetch/driver-op';
import { environment } from 'src/environments/environment';
import { UriService } from '../visitor-services/uri.service';

@Injectable({
    providedIn: 'root'
})
export class DriverDashboardService {


    constructor(private uriService: UriService, public toastController: ToastController, private httpClient: HttpClient) { }

    driverTripPlan: DriverTripPlan[] = []

    getCompanyTrip(driverTripFetch: CompanyTripFetch): Observable<DriverTripPlan[]> {
        console.log(JSON.stringify(driverTripFetch));
        var url = '/mob/load/company-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripFetch);
    }

    getDriverTrip(driverTripFetch: DriverTripFetch): Observable<DriverTripPlan[]> {
        console.log(JSON.stringify(driverTripFetch));
        var url = '/mob/load/trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripFetch);
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
        console.log(JSON.stringify(tripInfoId));
        var url = '/mob/load/scanned-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripInfoId);
    }

    getPartnerCompanyInfo(companyId: string): Observable<CompanyInfo> {
        // console.log(JSON.stringify(companyId));
        var url = '/mob/load/partner-com-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    savePackageDef(newPackage: PackageInfo): Observable<PackageInfo> {
        console.log(JSON.stringify(newPackage));
        var url = '/mob/load/save-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newPackage);
    }

    getPickPackageDefList(pickId: string): Observable<PackageInfo[]> {
        console.log(JSON.stringify(pickId));
        var url = '/mob/load/get-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickId);
    }

    getTripPackageDefList(tripId: string): Observable<PackageInfo[]> {
        console.log(JSON.stringify(tripId));
        var url = '/mob/load/get-trip-package-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripId);
    }

    getHandoverPackageDefList(handoverPickIds: string[]): Observable<PackageInfo[]> {
        console.log(JSON.stringify(handoverPickIds));
        var url = '/mob/load/get-handover-packages';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    confirmHandover(handoverPickIds: string[]): Observable<PickInfo[]> {
        console.log(JSON.stringify(handoverPickIds));
        var url = '/mob/load/confirm-handover-picks';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    getCurrentDate(): Observable<any> {
        // console.log(JSON.stringify(driverTripFetch));
        var url = '/mob/load/current-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    confirmReceivedWeight(pickList: PickInfo[]): Observable<string> {
        console.log(JSON.stringify(pickList));
        var url = '/mob/load/confirm-received-weight';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickList);
    }

    confirmUnload(handoverPickIds: string[]): Observable<PickInfo[]> {
        console.log(JSON.stringify(handoverPickIds));
        var url = '/mob/load/confirm-unload-picks';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds);
    }

    saveDumpingEmissionInfo(dumpingEmissionInfo: DumpingEmissionInfo[]): Observable<any> {
        var url = '/carbon/load-items';
        // var options: any = this.uriService.getHttpOptions();
        // return this.http.post<string>(url, dumpingEmissionInfo, options);
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, dumpingEmissionInfo);
    }

    saveProcessorEmissionInfo(processorEmissionInfo: ProcessorEmissionInfo[]): Observable<any> {
        var url = '/carbon/unload-items';
        // var options: any = this.uriService.getHttpOptions();
        // return this.http.post<string>(url, processorEmissionInfo, options);
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, processorEmissionInfo);
    }

    saveMenifestoUnloadStatus(handoverPickIds: string[]): Observable<string[]> {
        var url = '/mob/menifesto/menifesto-unload';
        // var options: any = this.uriService.getHttpOptions();
        // return this.http.post<string>(url, handoverPickIds, options);
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

    generateWasteHandoverQrCode(pickWisePackageList: PickWisePackage[], tripInfoId: string, companyId: string) {
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

        var url = this.BASE_URL + '/web/menifesto/generate-report';

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

    getDateAsFrontendFormat(date: string) {
        var url = '/util/current-date-view';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, date);

    }

    prepareWeightCertificateData(weightCertificateInfo: WeightCertificateInfo, uiLabels: any): WeightCertificateReportData {
        debugger
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
            onlyTruckWeight: weightCertificateInfo.wasteNetWeight.toString(),
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
            recipsonistSealPhoto: userSealPath
        }

        weightCertificateReportParameter.weightCertificateData = JSON.stringify(this.prepareWeightCertificateWasteList(weightCertificateInfo.wasteList));

        weightCertificateData.parameters = weightCertificateReportParameter;

        return weightCertificateData;
    }

    prepareWeightCertificateWasteList(wasteList: WasteWisePickPackageInfo[]) {

        var certificateWasteList: WeightCertificateWaste[] = [];

        wasteList.forEach(element => {
            var certificateWaste: WeightCertificateWaste = {
                productName: element.wasteTitle,
                adjustment: element.totalDeclaredQunatity.toString(),
                container: element.totalQunatity.toString(),
                netWeight: element.totalQunatity.toString()
            }

            certificateWasteList.push(certificateWaste);
        });

        return certificateWasteList;
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