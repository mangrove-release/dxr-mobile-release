
export interface CompanyInfoFetch {
    companyId: string,
    companyName: string,
    zipcode: string,
    zipcodeFormated: string,
    companyAddress: string,
    representativeName: string,
    representativEmail: string,
    contactNo: string,
    contactNoFormated: string | '',
    companyBusinessCategory: Array<string>,
    companyFaxNumber: string,
    companyFaxNumberFormated: string | '',
    notification: string,
    accountantName: string,
    accountantEmail: string,
    corporateRegNo: string,
    wasteProcessingLicenseNo: string,
    uploadLicense: string | null,
    companySealUploadedFile: string | null,
    frontendDate: string,
    backendDate: string,
    remarks: string,
    companyEmail: string | '',
    subscriptionId: string,
    accountantInfo: AccountantInfo,
    bankAccountList: BankAccountInfo[],
    branchList: BranchInfoFetch[],
    vehicleList: VehicleInfoFetch[],
    scaleSettingInfo: ScaleSettingInfo[],
    wasteList: CompWasteInfoFetch[],
}

export interface DxrWasteInfoFetch {
    categoryId: string;
    categoryTitle: string;
    dxrWasteTypeDef: dxrWasteTypeDef[]
}
export interface dxrWasteTypeDef {
    wasteTypeId: string;
    wasteTypeTitle: string;
    dxrWasteItemDef: DxrWasteItemDef[];
    categoryId: string;

}
export interface DxrWasteItemDef {
    wasteId: string,
    wasteItem: string,
    unitDef: string,
    wasteShape: string;
    wastePackage: string;
    remarks: string;
    wasteTypeId: string,
}

export interface AccountantInfo {
    companyId: string,
    accountantId: string,
    accountantName: string,
    accountantEmail: string,
    contactNo: string,
    contactNoFormated: string | '',
    invoiceClosingDate: string,
    invoicePaymentDate: string,
    paymentMode: Array<string>
}

export interface BankAccountInfo {
    companyId: string,
    bankAccountId: string,
    bankName: string,
    branchName: string,
    accountNumber: string,
    accountName: string
}

export interface BranchInfoFetch {
    companyId: string,
    branchId: string,
    frontendDate: string,
    backendDate: string,
    branchName: string,
    zipcode: string,
    zipcodeFormated: string | '',
    branchAddress: string,
    branchContactNo: string,
    branchContactNoFormated: string | '',
    branchFAX: string,
    branchFAXFormated: string | '',
    branchInchargeName: string,
    branchBusinessCategory: Array<string>,
    remark: string,

}
export interface VehicleInfoFetch {
    companyId: string,
    vehicleId: string,
    frontendDate: string,
    backendDate: string,
    manufacturerName: string,
    vehicleType: string,
    modelName: string,
    vehicleRegNo: string,
    vehicleCapacity: string,
    vehicleWeight: string,
    gasolineType: Array<string>,
    inspectionDate: string,
    vehicleOwnerShip: Array<string>,
    zipcode: string,
    zipcodeFormated: string | '',
    officeAddress: string,
    fitnessLicense: string | null,
    remarks: string
}

export interface ScaleSettingInfo {
    companyId: string;
    scaleId: string;
    nameOfScale: string;
    capacity: number;
    scaleNumber: string;
    quantity: number;
    registrationNo: string;
    responsiblePersonId: string;
    personName: string;
    personEmail: string;
    personContact: string;
    personSeal: string;
}

export interface CompanyWasteUpdate {
    companyId: string;
    companyWasteList: CompWasteInfoFetch[];
}

export interface CompWasteInfoFetch {
    // companyId: string,
    categoryId: string;
    categoryTitle: string;
    dxrWasteTypeDef: comWasteTypeDef[]
}

export interface comWasteTypeDef {
    wasteTypeId: string;
    wasteTypeTitle: string;
    dxrWasteItemDef: WasteItemDef[];
    categoryId: string;

}

export interface WasteItemDef {
    wasteTypeId: string,
    wasteId: string,
    wasteItem: string,
    unitDef: string,
    wasteShape: string,
    wastePackage: string,
    transportPrice: number,
    transportPriceFormated: string | '',
    processingPrice: number,
    processingPriceFormated: string | '',
    frontendDate: string,
    backendDate: string,
    remarks: string,
    dxrWasteItemId: string
}

export interface WasteRequestInfo {
    companyId: string,
    companyName: string,
    userEmail: string,
    userName: string,
    wasteRequestId: string,
    personName: string,
    contactNo: string,
    ContactNoFormated: string | '',
    wasteType: string,
    wasteItem: string,
    unitDef: string,
    wasteShape: string,
    wastePackage: string,
    frontendDate: string,
    backendDate: string,
    reply: string

}
export interface WasteRequestResponse {
    wasteRequestResponseId: string;
    wasteRequestId: string;
    reply: string;
}
export interface CompanyFilesView {
    wasteProcessingLicenses: string | null;
    companySealFile: string | null;
}