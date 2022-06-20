import { AgreementInfo, AgreementInfoUpdate, AgreementPartnerInfo } from "./business-agreement";
import { WasteItemDef } from "./company-settings-fetch";
import { PickInfo } from "./driver-op";



export interface MenifestoInfo {
    menifestoInfoId: string;
    menifestoUniqueId: string;
    date: string;
    projectId: string;
    tripIds: string[];
    tripIdDef: MenifestoTripDef[];
    pickIdDef: PickInfo[];
    wasteId: string;
    projectName: string;
    creator: string;
    firstParty: string;
    secondparty: string;
    aggrementInfo: AgreementInfoUpdate;
    menifestoStatus: string;
    manualManifesto: ManualManifesto;
    manifestoType: string;
}

export interface MenifestoTripDef {
    tripId: string;
    date: string;
    projectList: MenifestoProjectWasteDef[];
}

export interface MenifestoProjectWasteDef {
    projectId: string;
    wasteIdList: ManifestoWasteItemDef[];
}

export interface ManifestoWasteItemDef {
    wasteTypeId: string;
    wasteId: string;
    wasteTitle: string;
    unitDef: string;
    wasteShape: string;
    wastePackage: string;
    processingPrice: number;
    dxrWasteItemId: string;
    totalQunatity: number;
    totalDeclaredQunatity: number;
    collectionId: string;
}

export interface Invoice {
    invoiceId: string;
    invoiceNo: string;
    subject: string;
    billAmount: number;
    remark: string;
    frontendDate: string;
    backendDate: string;
    status: Status;
    generatorCompInfo: AgreementPartnerInfo;
    receiveCompInfo: AgreementPartnerInfo;
    manifestoList: MenifestoInfo[];
}

export interface Status {
    statusId: string;
    statusTitle: string;
}

export interface ManualManifesto {
    date: string;
    deliveryNo: string;
    manifestoNo: string
    refNo: string;
    dumperInfo: DumperInfo;
    manifestoDisposeWasteInfo: ManifestoDisposeWasteInfo[];
    manifestoProcessWasteInfo: ManifestoProcessWasteInfo[];
    transhipmentInfo: TranshipmentInfo;
    transportInfo: TransportInfo;
    totalQuantity: number;
    processorInfo: ProcessorInfo
    additionalInfo: string;
}

export interface DumperInfo {
    companyId: string;
    personInChargerId: string;
    personInchargeEmail: string;
    personName: string;
    businessName: string;
    zipCode: string;
    address: string;
    contactNo: string;
    workPlace: string;
    workZip: string;
    workAddress: string;
    workContactNo: string;
}

export interface ManifestoDisposeWasteInfo {
    collectionId: string;
    wasteId: string;
    wasteName: string;
    unit: string;
    shape: string;
    wastePackage: string;
    quantity: number;
    transportPrice: number;

}

export interface ManifestoProcessWasteInfo {
    collectionId: string;
    wasteId: string;
    wasteName: string;
    unit: string;
    shape: string;
    wastePackage: string;
    quantity: number;
    establishedQuantity: number;
    processPrice: number;
}

export interface TranshipmentInfo {
    storageName: string;
    inCharge: string;
    zipCode: string;
    address: string;

}
export interface TransportInfo {
    companyId: string;
    personInChargerId: string;
    personInchargeEmail: string;
    personName: string;
    businessName: string;
    zipCode: string;
    address: string;
    contactNo: string;
    vehicleNo: string;
    vehicleType: string;
    transportMethod: string;
    TransportComplateDate: string;
    driverName: string;
}

export interface ProcessorInfo {
    companyId: string;
    personInChargerId: string;
    personInchargeEmail: string;
    personName: string;
    businessName: string;
    zipCode: string;
    address: string;
    contactNo: string;
    processingComplateDate: string;
    disposeComplateDate: string;

}


export interface NotificationSetInfo {
    contextId: string;
    companyId: string;
    baseTableId: string;
    trigerUserInfoId: string;
    status: StatusInfo;


}
export interface StatusInfo {
    id: string;
    titleEng: string;
    titleJpn: string;
}