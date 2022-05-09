
export interface CompanyInfoUpdate {
    companyId: string,
    companyName: string,
    zipcode: string;
    companyAddress: string,
    representativeName: string,
    representativEmail: string,
    contactNo: string,
    companyBusinessCategory: Array<string>,
    companyFaxNumber: string,
    notification: string,
    corporateRegNo: string,
    wasteProcessingLicenseNo: string,
    uploadLicense: string | null,
    companySealUploadedFile: string | null,
    remarks: string,
    companyEmail: string | '',
    subscriptionId: string,
}
export interface AccountantInfoUpdate {
    companyId: string,
    accountantId: string,
    accountantName: string,
    accountantEmail: string,
    invoiceClosingDate: string,
    invoicePaymentDate: string,
    paymentMode: Array<string>
}
export interface BranchInfoUpdate {
    companyId: string,
    branchId: string,
    branchName: string,
    branchAddress: string,
    branchContactNo: string,
    branchInchargeName: string,
    branchBusinessCategory: Array<string>,
    remark: string,
}

export interface VehicleInfoUpdate {
    companyId: string,
    vehicleId: string,
    manufacturerName: string,
    vehicleType: string,
    modelName: string,
    vehicleRegNo: string,
    vehicleCapacity: string,
    vehicleWeight: string,
    gasolineType: Array<string>,
    inspectionDate: string,
    vehicleOwnerShip: string,
    officeAddress: string,
    remarks: string
}
export interface CompanyWasteInfoUpdate {
    companyId: string,
    companyWasteId: string,
    wasteId: string,
    wasteCatagory: string,
    wasteItem: string,
    unitDef: string,
    wasteShape: string,
    wastePackage: string,
    transportPrice: number,
    processingPrice: number,
    remarks: string,
}
export interface PriceInfoUpdate {
    companyId: string,
    wasteId: string,
    transportPrice: number,
    processingPrice: number,
}
export interface Catagory {
    name: string;
    isCheck: boolean;
    label: any;
}

export interface GasolineType {
    name: string;
    isCheck: boolean;
    label: any;
}

export interface PaymentMode {
    name: string;
    isCheck: boolean;
    label: any;
}

export interface BranchAddressInfo {
    branchName: string,
    branchAddress: string,
    branchZipCode: string,
}
export interface DxrWasteViewList {
    categoryId: string;
    categoryTitle: string;
    dxrWasteTypeDef: dxrWasteTypeDefView[]
}
export interface dxrWasteTypeDefView {
    wasteTypeId: string;
    wasteTypeTitle: string;
    dxrWasteItemDef: DxrWasteViewDef[];
    categoryId: string;

}
export interface DxrWasteViewDef {
    wasteTypeId: string,
    wasteId: string,
    wasteItem: string,
    unitDef: string,
    transportPrice: number,
    processingPrice: number,
    frontendDate: string,
    backendDate: string,
    wasteShape: string;
    wastePackage: string;
    remarks: string;
    isSelect: boolean
}