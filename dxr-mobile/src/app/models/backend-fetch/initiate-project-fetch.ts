import { AgreementWasteProcessInfo } from "./business-agreement";

export interface CompanyProjectFetch {
    companyProjectList: ProjectInfoFetch[],

}
export interface CompanyBranchFetch {
    branchInfoList: BranchInfoFetch[],


}
export interface CompanyAgreementFetch {
    agreementList: AgreementInfoFetch[],
}

export interface ProjectInfoFetch {
    companyId: string;
    initiatorCompanyName: string;
    operatingOfficeName: string;
    operatingOfficeId: string;
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
    operatingAddress: string;
    operatingZipCode: string;
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
    disposalViewId: string;
    collectionId: string;
    fromDate: string;
    toDate: string;
    quantity: number;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickLocation: string;
    pickZipCode: string;
    dropLocation: string;
    dropZipCode: string;
    isParent: boolean;
    unit: string;
    price: number
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
    processList: AgreementWasteProcessInfo[],


}
export interface AgreementPartnerCompanyFetch {
    companyInfoId: string;
    companyName: string;
    personIncharge: string;
    personInchargeEmail: string;
    assignRoles: string;
}

export interface AgreementPopupView {
    projectInfo: ProjectInfoFetch;
    agreementList: AgreementInfoFetch[];
}
export interface WasteCollectionInfoView {

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
    isCheck: boolean

}
export interface AgreementInfoView {
    companyId: string;
    agreementId: string;
    agreementTitle: string;
    agreementValidDate: string;
}
export interface ProjectWasteItem {
    wasteCollectionId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    unit: string
}
export interface AgreementPopupSaveDetails {
    selectAgreement: AgreementInfoFetch;
    selectDiposalList: DisposalInfoFetch[];
    selectProceessList: wasteProcessInfoFetch[];
    selectedWasteItemList: wasteItemInfo[];
}


















