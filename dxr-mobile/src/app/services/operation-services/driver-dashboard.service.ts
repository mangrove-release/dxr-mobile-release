import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripFetch, DriverTripPlan, HandoverWastePickAndPackage, LoadPackageView, PackageInfo, PickInfo, PickWisePackage, TripQrData, WasteWisePickPackageInfo } from 'src/app/models/backend-fetch/driver-op';
import { UriService } from '../visitor-services/uri.service';

@Injectable({
    providedIn: 'root'
})
export class DriverDashboardService {


    constructor(private uriService: UriService, public toastController: ToastController) { }

    driverTripPlan: DriverTripPlan[] = [
        {
            tripInfoId: 'trip0001',
            pickUpDate: '2022040510000000',
            pickUpDateView: '2022040510000000',
            startTime: '07:00',
            endTime: '12:00',
            driverId: 'driver0001',
            driverName: "Rakib",
            driverLicenseNo: "DL-387493",
            pickList: [
                {
                    pickId: 'pick0001',
                    quantity: 2,
                    tripId: 'trip0001',
                    projectTitle: 'DX-R Project',
                    projetId: 'DX-R Project',
                    loadStatus: "0",
                    declaredQunatity: 2,
                    disposalInfo: {
                        disposalInfoId: "",
                        disposalViewId: "",
                        collectionId: "",
                        wasteTypeId: "",
                        wasteTypeName: "",
                        wasteItemId: "waste001",
                        wasteItemName: "Coal",
                        fromDate: "",
                        toDate: "",
                        quantity: 0,
                        pickLocation: "Mirpur",
                        pickZipCode: "120000",
                        dropLocation: "",
                        dropZipCode: "",
                        unit: "",
                        price: 0,
                        isParent: false
                    }
                },
                {
                    pickId: 'pick0002',
                    quantity: 2,
                    tripId: 'trip0001',
                    projectTitle: 'DX-R Project',
                    projetId: 'DX-R Project',
                    loadStatus: "0",
                    declaredQunatity: 2,
                    disposalInfo: {
                        disposalInfoId: "",
                        disposalViewId: "",
                        collectionId: "",
                        wasteTypeId: "",
                        wasteTypeName: "",
                        wasteItemId: "waste002",
                        wasteItemName: "Iron Scrap",
                        fromDate: "",
                        toDate: "",
                        quantity: 0,
                        pickLocation: "Mirpur",
                        pickZipCode: "120000",
                        dropLocation: "",
                        dropZipCode: "",
                        unit: "",
                        price: 0,
                        isParent: false
                    }
                },
                {
                    pickId: 'pick0003',
                    quantity: 2,
                    tripId: 'trip0001',
                    projectTitle: 'DX-R Project',
                    projetId: 'DX-R Project',
                    loadStatus: "0",
                    declaredQunatity: 2,
                    disposalInfo: {
                        disposalInfoId: "",
                        disposalViewId: "",
                        collectionId: "",
                        wasteTypeId: "",
                        wasteTypeName: "",
                        wasteItemId: "waste001",
                        wasteItemName: "Chemical",
                        fromDate: "",
                        toDate: "",
                        quantity: 0,
                        pickLocation: "Mirpur",
                        pickZipCode: "120000",
                        dropLocation: "",
                        dropZipCode: "",
                        unit: "",
                        price: 0,
                        isParent: false
                    }
                },
                {
                    pickId: 'pick0004',
                    quantity: 2,
                    tripId: 'trip0001',
                    projectTitle: 'DX-R Project',
                    projetId: 'DX-R Project',
                    loadStatus: "0",
                    declaredQunatity: 2,
                    disposalInfo: {
                        disposalInfoId: "",
                        disposalViewId: "",
                        collectionId: "",
                        wasteTypeId: "",
                        wasteTypeName: "",
                        wasteItemId: "waste003",
                        wasteItemName: "Iron Scrap",
                        fromDate: "",
                        toDate: "",
                        quantity: 0,
                        pickLocation: "Pallabi",
                        pickZipCode: "120002",
                        dropLocation: "",
                        dropZipCode: "",
                        unit: "",
                        price: 0,
                        isParent: false
                    }
                }
            ],
            vehicleInfo: {
                companyId: "",
                vehicleId: "",
                frontendDate: "",
                backendDate: "",
                manufacturerName: "Tesla",
                vehicleType: "Truck",
                modelName: "",
                vehicleRegNo: "TH-3763231",
                vehicleCapacity: "10",
                vehicleWeight: "",
                gasolineType: [],
                inspectionDate: "",
                vehicleOwnerShip: [],
                zipcode: "",
                zipcodeFormated: '',
                officeAddress: "",
                fitnessLicense: "",
                remarks: ""
            }
        }
    ]

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

    getTripInfo(tripInfoId: string): Observable<DriverTripPlan> {
        console.log(JSON.stringify(tripInfoId));
        var url = '/mob/load/scanned-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripInfoId);
    }

    getPartnerCompanyInfo(companyId: string): Observable<CompanyInfo> {
        console.log(JSON.stringify(companyId));
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

    driverCompanyInfo: CompanyInfo;

    loadPackage: LoadPackageView;
}
