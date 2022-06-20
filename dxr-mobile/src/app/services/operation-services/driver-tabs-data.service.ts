import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HandoverCodeComponent } from 'src/app/load/handover-code/handover-code.component';
import { CompanyInfo, DriverTripPlan, HandoverWastePickAndPackage, PackageInfo, PickInfo, TripQrData, WeightCertificateInfo } from 'src/app/models/backend-fetch/driver-op';

@Injectable({
    providedIn: 'root'
})
export class DriverTabsDataService {
    processorCompanyInfo: CompanyInfo;
    transporterHandoverData: HandoverWastePickAndPackage;
    driverTripPlan: DriverTripPlan[] = [];
    selectedTrip: DriverTripPlan = {} as DriverTripPlan;
    tripDate: any = {
        date: ''
    };

    dumperScannedTripId: string;
    scannedTripInfo: TripQrData;
    scannedTripPlan: DriverTripPlan = {} as DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;

    selectedPickForPackageDef: PickInfo;

    allPackageDef: PackageInfo[] = [];

    weightCertificateInfo: WeightCertificateInfo;

    constructor() { }

    setDriverTripPlan(tripPlan: DriverTripPlan[]) {
        this.driverTripPlan = tripPlan;
    }

    getDriverTripPlan() {
        return this.driverTripPlan;
    }

    setSelectedTrip(selectedTrip: DriverTripPlan) {
        this.selectedTrip = selectedTrip;
    }

    getSelectedTrip() {
        return this.selectedTrip;
    }

    setTripDate(tripDate: any) {
        this.tripDate = tripDate;
    }

    getTripDate() {
        return this.tripDate;
    }

    setDumperScannedTripId(dumperScannedTripId: string) {
        this.dumperScannedTripId = dumperScannedTripId;
    }

    getDumperScannedTripId() {
        return this.dumperScannedTripId;
    }

    setScannedTripInfo(scannedTripInfo: TripQrData) {
        this.scannedTripInfo = scannedTripInfo;
    }

    getScannedTripInfo() {
        return this.scannedTripInfo;
    }

    setTransporterCompanyInfo(transporterCompanyInfo: CompanyInfo) {
        this.transporterCompanyInfo = transporterCompanyInfo;
    }

    getTransporterCompanyInfo() {
        return this.transporterCompanyInfo;
    }

    setScannedTripPlan(scannedTripPlan: DriverTripPlan) {
        this.scannedTripPlan = scannedTripPlan;
    }

    getScannedTripPlan() {
        return this.scannedTripPlan;
    }

    setSelectedPickForPackageDef(selectedPickForPackageDef: PickInfo) {
        this.selectedPickForPackageDef = selectedPickForPackageDef;
    }

    getSelectedPickForPackageDef() {
        return this.selectedPickForPackageDef;
    }

    setAllPackageDef(allPackageDef: PackageInfo[]) {
        this.allPackageDef = allPackageDef;
    }

    getAllPackageDef() {
        return this.allPackageDef;
    }

    setTransporterHandoverData(transporterHandoverData: HandoverWastePickAndPackage) {
        this.transporterHandoverData = transporterHandoverData;
    }

    getTransporterHandoverData() {
        return this.transporterHandoverData;
    }

    setProcessorCompanyInfo(processorCompany: CompanyInfo) {
        this.processorCompanyInfo = processorCompany;
    }

    getProcessorCompanyInfo() {
        return this.processorCompanyInfo;
    }

    addPackageDef(packageDef: PackageInfo) {
        var index = this.allPackageDef.findIndex(item => item.packageId == packageDef.packageId);

        if (index >= 0) {
            this.allPackageDef[index] = packageDef;
        } else {
            this.allPackageDef.unshift(packageDef);
        }

    }

    setWeightCertificateInfo(weightCertificateInfo: any): void {
        this.weightCertificateInfo = weightCertificateInfo;
        this.weightCertificateInfo.processorCompanyInfo = JSON.parse(weightCertificateInfo.processorCompanyInfo);
        this.weightCertificateInfo.transporterCompanyInfo = JSON.parse(weightCertificateInfo.transporterCompanyInfo);
        this.weightCertificateInfo.driverInfo = JSON.parse(weightCertificateInfo.driverInfo);
        this.weightCertificateInfo.scaleInfo = JSON.parse(weightCertificateInfo.scaleInfo);
        this.weightCertificateInfo.wasteList = JSON.parse(weightCertificateInfo.wasteList);
    }

    getWeightCertificateInfo(): WeightCertificateInfo {
        return this.weightCertificateInfo
    }

}
