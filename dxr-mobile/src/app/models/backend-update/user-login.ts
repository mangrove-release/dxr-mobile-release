import { TripQrData } from "../backend-fetch/driver-op";

export interface UserIdentification {
    userId: string,
    userAuth: string,
    oneTimeAccessFlag: string
}

export interface ChangeUserIdentification {
    userId: string,
    accessCode: string,
    oneTimeAccessFlag: string,
    newAuth: string
}

export interface UserInfoUpdate {
    userInfoId: String,
    userName: String,
    userAddress: String,
    departmentTitle: String,
    userEmail: String,
    userContact: String,
    userCompanyId: String,
    userCategoryId: String;
}

export interface UserInfoFetch {
    name: String,
    address: String,
    departmentTitle: String,
    email: String,
    mobile: String,
    companyId: String
}

export interface AccessInfoView {
    accessFlag: String,
    accessInfo: any[]
}
export interface UserIdentificationFetch {
    userIdentification: string;
}

export interface RedirectUserInfo {
    redirectSessionId: string;
    userId: string;
    userAuth: string;
    companyId: string;
    tripQrData: TripQrData;
    redirectMenuUrlParentSegment: string;
    redirectMenuUrl: string;
    redirectMenuOutlet: string;
    userMenuAccess: string;
}