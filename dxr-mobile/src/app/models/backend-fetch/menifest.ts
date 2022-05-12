import { AgreementInfo } from "./business-agreement";

export interface MenifestoInfo {
    menifestoInfoId: string;
    menifestoUniqueId: string;
    date: string;
    projectId: string;
    tripIds: string[];
    tripIdDef: any[];
    pickIdDef: any[];
    wasteId: string;
    projectName: string;
    creator: string;
    firstParty: string;
    secondparty: string;
    aggrementInfo: AgreementInfo;
}