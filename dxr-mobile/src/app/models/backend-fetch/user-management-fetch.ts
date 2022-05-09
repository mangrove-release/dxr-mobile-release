

export interface CompanyInfoFetch {
    companyId: string;
    companyName: string;
    companyAddress: string;
    subscriptionId: string;
    companyEmail: string;
    zipcode: string;
    representativeName: string;
    telephoneNumber: string;
    companyBusinessCategory: Array<string>;
    companyFaxNumber: string;
    representativEmail: string;
    notification: string;
    accountantName: string;
    accountantEmail: string;
    corporateRegNo: string;
    wasteProcessingLicenseNo: string;
    uploadLicense: string;
    users: Array<UserInfoFetch>;
    branches: Array<BranchInfoFetch>

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

export interface RoleWiseMenuAcccessFetch {
    roleDefId: string;
    roleName: string;
    companyCategoryId: string;
    companyCategoryName: string;
    accessibleMenuListOfRole: MenuAccessInfo[]
}


export interface UserInfoQuery {
    userIdentificationId: string;
    companyId: string;
}


export interface UserInfoFetch {
    companyId: string;
    userIdentificationId: string;
    userInfoId: string;
    officeName: string;
    officeAddress: string;
    officeContactNo: string;
    userCatagory: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userContactNo: string;
    userId: string;
    role: string;
    tempPassword: string;
    department: string;
    jobTitle: string;
    licenseNo: string;
    remarks: string;
    drivingLicenseUpload: string | null;
    userSealUploadedFile: string | null;
    userRoles: DxrRole[],
    userContactNoFormated: string | '';

}

export interface DxrRole {
    roleDefId: string;
    roleName: string;
    roleCode: string;
    roleDescription: string;
    companyCategoryId: string;
    companyCategoryName: string;
}


export interface DxrRoleSelectionView {
    roleDefId: string;
    roleName: string;
    roleCode: string;
    roleDescription: string;
    companyCategoryId: string;
    companyCategoryName: string;
    isCheck: boolean;
}

export interface UserMenuAccessUpdate {
    userId: string;
    companyId: string;
    assignedRoles: DxrRole[],
    accessibleMenuListOfUser: MenuAccessInfo[]
}

export interface MenuAccessInfo {
    menuId: string;
    menuTitle: string;
    menuTitleEng: string;
    menuTitleJpn: string;
    menuUrl: string;
    parentSegment: string;
    menuGroupNameEng: string;
    menuGroupNameJpn: string;
    primaryMenuNameEng: string;
    primaryMenuNameJpn: string;
    secondaryMenuNameEng: string;
    secondaryMenuNameJpn: string;
    menuParent: string;
    menuTypeId: string;
    menuTypeName: string;
    companyCategoryId: string;
    companyCategoryName: string;
    activeAccess: ActiveAccess;

}

export interface UserMenuDef {
    menuId: string;
    menuTitleEng: string;
    menuTitleJpn: string;
    menuUrl: string;
    parentSegment: string;
    menuParent: string;
    menuTypeId: string;
    companyCategoryId: string;
    accessInfo: AccessDef;
    child: UserMenuDef[]

}



export interface UserMenuDefUpdate {
    companyId: string;
    userIdentificationId: string;
    userAccessInfo: UserMenuDef[];
    isDxrAdmin: boolean;
    isCompanyAdmin: boolean
}

export interface UserMenuAccessUpdate {
    userId: string;
    companyId: string;
    userMenuDef: UserMenuDef;
}

export interface ActiveAccess {
    roleInfo: DxrRole;
    accessInfo: AccessDef
}

export interface AccessDef {
    accessDefId: string;
    accessTitle: string;
}


export interface UserMenuAccessView {
    menuId: string;
    menuTitle: string;
    menuTitleEng: string;
    menuTitleJpn: string;
    menuUrl: string;
    parentSegment: string;
    menuGroupNameEng: string;
    menuGroupNameJpn: string;
    primaryMenuNameEng: string;
    primaryMenuNameJpn: string;
    secondaryMenuNameEng: string;
    secondaryMenuNameJpn: string;
    menuParent: string;
    menuTypeId: string;
    menuTypeName: string;
    companyCategoryId: string;
    companyCategoryName: string;
    allActiveAccess: ActiveAccess[];
    activeAccess: ActiveAccess;
}
export interface sentSelectedUserDataForSetRole {
    selectedUserInfo: UserInfoFetch,
    dxrRoleForselectedUser: DxrRoleSelectionView[];
    menuAccesList: UserMenuAccessView[];
    roleWiseMenuAccessList: RoleWiseMenuAcccessFetch[];
    selectedUserView: SelectedUserView

}
export interface AddUserView {
    users: UserInfoFetch;
    companyInfo: CompanyInfoFetch;

}
export interface AddressDropDownView {
    id: string;
    name: string;
    address: string;
    contactNo: string;
    zipcode: string;
}
export interface UserInfoView {
    companyId: string;
    userIdentificationId: string;
    userInfoId: string;
    officeName: string;
    officeAddress: string;
    officeContactNo: string;
    userCatagory: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userContactNo: string;
    userId: string;
    role: string;
    tempPassword: string;
    department: string;
    jobTitle: string;
    licenseNo: string;
    remarks: string;
    drivingLicenseUpload: string | null;
    userRoles: DxrRole[],
}
export interface SelectedUserView {
    name: string;
    email: string;
    contactNo: string;
}
export interface FileView {
    image: string | null;
    title: string;
}
export interface UserInfoFiles {
    drivingLicenseFile: string | null;
    userSealFile: string | null;
}












