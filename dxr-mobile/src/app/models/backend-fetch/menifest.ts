import { AgreementInfo, AgreementPartnerInfo } from "./business-agreement";
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
    aggrementInfo: AgreementInfo;
    menifestoStatus: string;
}

export interface MenifestoTripDef {
    tripId: string;
    date: string;
    projectList: MenifestoProjectWasteDef[];
}

export interface MenifestoProjectWasteDef {
    projectId: string;
    wasteIdList: WasteItemDef[];
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
