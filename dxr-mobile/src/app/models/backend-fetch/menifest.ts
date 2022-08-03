import { AgreementInfo, AgreementInfoUpdate, AgreementPartnerInfo } from "./business-agreement";
import { WasteItemDef } from "./company-settings-fetch";
import { PickInfo } from "./driver-op";

export interface MenifestoInfo {
    menifestoInfoId: string;
    menifestoUniqueId: string;
    date: string;
    dateView: string;
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
    manualEdit: boolean;
    invoiceGenrationStatus: string;

}
export interface ManualManifesto {
    date: string;
    dateView: string;
    deliveryNo: string;
    manifestoNo: string;
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
    transportComplateDate: string;
    transportComplateDateView: string;
    transportComplateDateB2: string;
    transportComplateDateB2View: string;
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
    processingComplateDateView: string;
    processingComplateDateC2: string;
    processingComplateDateC2View: string;
    disposeComplateDate: string;
    disposeComplateDateView: string;
    finalDisposeComplateDate: string;
    finalDisposeComplateDateView: string;

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
    collectionId: string;
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
}



export interface MenifestReportCallData {
    designFile: string;
    outputName: string;
    format: string;
    parameters: MenifestReportData;
    wrapError: true
}

export interface MenifestoWaste {
    wasteItem: string;
    unit: string;
    packing: string;
    shape: string;
    quantity: number;
}

export interface MenifestReportData {
    title: string;
    refLabel: "Ref.No : ",
    refNo: string;
    dateLabel: "Date",
    date: string;
    manifestoLabel: "Delivery No",
    manifestoNo: string;
    issuersName: string;
    issuersNameLabel: "Issuer's Name",
    numberLabel: "Number",
    numberValue: string;
    dateValue: string;
    dumperCompanyInfoLabel: "Dumper Info",
    dumperCompanyNameLabel: "Company Nmae : ",
    companyName: string;
    address: string;
    addressLabel: "Address : ",
    personLabel: "In Charge : ",
    personInCharge: string;
    contactNoLabel: "Contact No : ",
    dumperCompanyContactNo: string;
    pickLocationContactNo: string;
    wastepickLocation: string;
    pickLocationInCharge: string;
    sightInfoLabel: "Sight Info",
    confirmationDateLabel: "Confirmation Date",
    sealAndSignLabel: "Seal & Sign",
    dumperHandOverDate: string;
    transportComplateDate: string;
    receiveComplateDate: string;
    processComplateDate: string;
    finalDisposalDate: string;
    tableHeaderLabel: "Type Of Industrial Waste",
    unitlabel: "t, kg, m3, l",
    manifestoData: string,
    userNameLabel: "User Name",
    intermediateProcessingWaste: "Intermediate Processing Waste",
    finalDisposalLocation: string;
    finalDisposalLocationlabel: "Final Disposal Location",
    locationName: string;
    locationNameLabel: "Location Name",
    transporter1Label: "Transporter 1",
    transporter2Label: "Transporter 2",
    transporterCompanyNameLabel: "Company Name : ",
    disposalContactorLabel: "Disposal Contactor",
    transhipmentLabel: "Tanshipment/Storage",
    consignment1Label: "Consignment 1",
    consignment2Label: "Consignment 2",
    consignmentDisposalLabel: "Consignment Disposal",
    finalDisposalDateLabel: "Final Disposal Date",
    additionalInfoLabel: "Additional Information",
    additionalInfo: string;
    userName: string;
    processingWaste: string;
    transporterAddress: string;
    transporterCompanyName: string;
    transportCompanyContactNo: string;
    transportInCharge: string;
    processorCompanyAddress: string;
    processorCompanyContactNo: string;
    menifestoStatus: string;
    processComplatedateC2: string;
    loadDateB1: string;
    serialNumberLabel: "S.N",
    wasteItemLabel: "Waste Item",
    tableUnitLabel: "Unit",
    shapeLabel: "Shape",
    packingLabel: "Packing",
    quanitityLabel: "Quantity",
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