
export interface CompanyScheduleFetch {
    companyProjectList: ProjectInfoFetch[],
    vehicleList: VehicleInfoFetch[],
    tripList: TripPlanFetch[]
}
export interface ProjectInfoFetch {
    companyId: string;
    projectInfoId: string;
    projectTitle: string;
    projectCreationDate: string;
    projectStartDate: string;
    projectEndDate: string;
    operatingBranch: BranchInfoFetch;
    dumperPartner: AgreementPartnerCompanyFetch;
    processorPartner: AgreementPartnerCompanyFetch;
    transporterPartner: AgreementPartnerCompanyFetch;
    wasteItemList: wasteItemInfo[]
    status: StatusInfo;
    agreementInfo: AgreementInfoFetch;
    wastePickInfo: WasteCollectionInfoFetch[];
    wasteProcessInfo: wasteProcessInfoFetch[];
    wasteDisposalInfo: DisposalInfoFetch[];
}
export interface StatusInfo {
    statusId: string;
    statusCode: string;
    statusName: string;
    statusDescription: string;
}
export interface wasteItemInfo {
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
}
export interface BranchInfoFetch {
    companyId: string,
    branchId: string,
    branchName: string,
    zipcode: string,
    branchAddress: string,
    branchContactNo: string,
    branchInchargeName: string,
    branchBusinessCategory: Array<string>,
    remark: string,


}
export interface WasteCollectionInfoFetch {

    wasteCollectionId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickZipCode: string;
    pickAddress: string;
    dropZipCode: string;
    dropAddress: string;
    price: number;
    unit: string;

}
export interface DisposalInfoFetch {
    disposalInfoId: string;
    collectionId: string;
    fromDate: string;
    toDate: string;
    quantity: number;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickLocation: string;
    dropLocation: string;
    isParent: boolean;
    unit: string;
    price: number;
    planQuantity: number;
}
export interface wasteProcessInfoFetch {
    wasteProcessId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    processStartDate: string;
    processEndDate: string;
    quantity: number;
    price: number;
    unit: string;
    totalPrice: number;


}
export interface AgreementInfoFetch {
    companyId: string;
    agreementId: string;
    agreementTitle: string;
    agreementValidDate: string;
    dumperPartner: AgreementPartnerCompanyFetch;
    processorPartner: AgreementPartnerCompanyFetch;
    transporterPartner: AgreementPartnerCompanyFetch;
    wastePickList: WasteCollectionInfoFetch[];



}
export interface AgreementPartnerCompanyFetch {
    companyInfoId: string;
    companyName: string;
    personIncharge: string;
    personInchargeEmail: string;
}
export interface VehicleInfoFetch {

    vehicleInfo: VehicleInfo,
    tripPlan: TripPlanFetch[],
}

export interface TripPlanFetch {
    date: string;
    tripList: TripInfo[];
}
export interface TripInfo {
    tripInfoId: string;
    pickUpDate: string;
    startTime: string;
    endTime: string;
    driverId: string;
    pickList: PickInfo[];
    vehicleId: string;

}

export interface VehicleInfo {
    companyId: string;
    vehicleId: string,
    frontendDate: string,
    backendDate: string,
    manufacturerName: string,
    vehicleType: string,
    modelName: string,
    vehicleRegNo: string,
    vehicleCapacity: string,
    vehicleWeight: string,
    gasolineType: string,
    inspectionDate: string,
    vehicleOwnerShip: Array<string>,
    openHour: string;
    remarks: string;
}

export interface DriverInfoFetch {
    companyId: string;
    userIdentificationId: string;
    userInfoId: string;
    officeContactNo: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userContactNo: string;
    licenseNo: string;
}
export interface PickInfo {
    pickId: string;
    disposalId: string;
    quantity: number;
    tripId: string;
}