import { ScaleSettingInfo, VehicleInfoFetch } from "./company-settings-fetch";
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
    companyZipCode: string;
    companyAddress: string;
    companyContact: string;
    companyEmail: string;
    personInChargeId: string;
    personInChargeName: string;
    personInChargeContact: string;
    personInChargeSeal: string;
    companySeal: string;

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

export interface DumpingEmissionInfo {
    dumpingEmissionId: string;
    companyId: string;
    quantity: number;
    dateTime: string;
    wasteItemId: string;
    wasteTitle: string;
    unit: string;
    pickId: string[];
}

export interface ProcessorEmissionInfo {
    processingEmissionId: string;
    companyId: string;
    quantity: number;
    dateTime: string;
    wasteItemId: string;
    wasteTitle: string;
    unit: string;
    pickId: string[];
}

export interface CompanyTripFetch {
    date: string;
    companyId: string;
}

export interface WeightCertificateInfo {
    weightCertificateInfoId: string;
    date: string;
    dateView: string;
    tripId: string;
    pickList: string;
    wasteGrossWeight: number;
    vehicleWeight: number;
    wasteNetWeight: number;
    processorCompanyInfo: CompanyInfo;
    transporterCompanyInfo: CompanyInfo;
    driverInfo: DriverTripPlan;
    scaleInfo: ScaleSettingInfo;
    wasteList: WasteWisePickPackageInfo[];

}

export interface WeightCertificateReportData {
    designFile: string;
    outputName: string;
    format: string;
    parameters: WeightCertificateReportParameter;
    wrapError: true
}

export interface WeightCertificateReportParameter {
    weightCertificateLabel: string;
    date: string;
    licenseLabel: string;
    transporterName: string;
    transporterNameLabel: string;
    vehicleNameNumber: string;
    vehicleNameNumberLabel: string;
    gorssWeightlabel: string;
    wasteTruckWeight: string;
    wasteTrackLabel: string;
    onlyTruckWeight: string;
    truckWeightLabel: string;
    weightCertificateData: string,
    totalLabel: string;
    remarksLabel: string;
    signLabel: string;
    nameLabel: string;
    performanceLabel: string;
    equipmentLabel: string;
    quintityLabel: string;
    nameValue: string;
    performanceValue: string;
    equipmentValue: string;
    quantityValue: string;
    processorName: string;
    fullAddress: string;
    reciptionistName: string;
    telLabel: string;
    telvalue: string;
    faxLabel: string;
    faxValue: string;
    compNameLabel: string;
    compAddressLabel: string;
    reciepsonistNameLabel: string;
    companySealsLabel: string;
    receipsonistSealLabel: string;
    companySealphoto: string;
    recipsonistSealPhoto: string;
}

export interface WeightCertificateWaste {
    productName: string;
    adjustment: string;
    container: string;
    netWeight: string;
}