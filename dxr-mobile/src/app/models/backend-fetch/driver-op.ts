import { VehicleInfoFetch } from "./company-settings-fetch";
import { DisposalInfoFetch } from "./initiate-project-fetch";


export interface DriverTripPlan {
    tripInfoId: string;
    pickUpDate: string;
    pickUpDateView: string;
    startTime: string;
    endTime: string;
    driverId: string;
    driverName: string;
    driverLicenseNo: string;
    pickList: PickInfo[];
    vehicleInfo: VehicleInfoFetch;
}

export interface PickInfo {
    pickId: string;
    disposalInfo: DisposalInfoFetch;
    quantity: number;
    tripId: string;
    projectTitle: string;
    projetId: string;
    loadStatus: string;
    declaredQunatity: number;
}

export interface PickGroup {
    pickLocation: PickInfo[];
}

export interface TripQrData {
    tripInfoId: string;
    pickLocation: string;
    driverCompanyId: string;
    driverId: string;
}

export interface CompanyInfo {
    companyId: string;
    companyName: string;
    personInChargeId: string;
    personInChargeName: string;
    personInChargeContact: string;
}

export interface PackageInfo {
    packageId: string;
    size: number;
    numberOfPackage: number;
    quantity: number;
    pickId: string;
    disposeId: string;
    tripId: string;
    isLumpsum: string;
}

export interface PickWisePackage {
    packageList: PackageInfo[];
    pick: PickInfo;
    calculatedQunatity: number;

}

export interface WasteWisePickPackageInfo {
    wasteId: string;
    wasteTitle: string;
    pickList: PickWisePackage[];
    totalQunatity: number;
    totalDeclaredQunatity: number;
}

export interface HandoverWastePickAndPackage {
    companyId: string;
    tripInfoId: string;
    pickIdList: string[];
}

export interface TripCompletionData {
    companyId: string;
    tripInfoId: string;
    pickIdList: string[];
}

export interface LoadPackageView {
    dumperInfo: CompanyInfo,
    transporterInfo: CompanyInfo,
    wasteWisePickPackageList: WasteWisePickPackageInfo[]
}

export interface DriverTripFetch {
    date: string;
    driverId: string;
}