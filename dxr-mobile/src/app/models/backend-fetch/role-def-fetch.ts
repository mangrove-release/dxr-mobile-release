export interface RoleWiseMenuAcccessFetch {
    roleDefId: string;
    roleName: string;
    companyCategoryId: string;
    companyCategoryName: string;
    accessibleMenuListOfRole: MenuAccessInfo[]
}

export interface RoleWiseMenuAcccessInfoUpdate {
    roleDefId: string;
    accessibleMenuListOfRole: MenuAccessInfo[]
}

export interface MenuItem {
    menuId: string;
    menuUrl: string;
    parentSegment: string;
    menuTitleEng: string;
    menuTitleJpn: string;
    menuParent: string;
    menuTypeId: string;
    companyCategoryId: string;
    accessId: string;
}

export interface ActiveAccess {
    roleInfo: DxrRole;
    accessInfo: AccessDef;
}

// export interface MenuAccessInfo {
//     menuId: string;
//     menuTitle: string;
//     menuUrl: string;
//     parentSegment: string;
//     menuGroupName: string;
//     primaryMenuName: string;
//     secondaryMenuName: string;
//     menuParent: string;
//     menuTypeId: string;
//     menuTypeName: string;
//     companyCategoryId: string;
//     companyCategoryName: string;
//     activeAccess: ActiveAccess;

// }


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

export interface MenuDef {
    menuId: string;
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

}

export interface UserMenuAccessView {
    menuId: string;
    menuTitle: string;
    menuUrl: string;
    parentSegment: string;
    menuGroupName: string;
    primaryMenuName: string;
    secondaryMenuName: string;
    menuParent: string;
    menuTypeId: string;
    menuTypeName: string;
    companyCategoryId: string;
    companyCategoryName: string;
    allActiveAccess: ActiveAccess[];
    children: UserMenuAccessView[] | null;
}


export interface MenuRoleAccessUpdate {
    menuDefId: string;
    roleAccessList: RoleAccessDefUpdate[];
}

export interface RoleAccessDefUpdate {
    roleDefId: string;
    accessDefId: string;
}

export interface RoleMenusUpdate {
    roleDefId: string;
    menuIdList: string[]
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
    roleDefInfo: DxrRole;
    accessList: AccessDefSelectionView[];
    selectedAccess: string;
    isSelected: boolean;
}

export interface AccessDefSelectionView {
    accessInfo: AccessDef;
    isSelected: boolean;
}

// export interface DxrRoleSelectionView {
//     roleDefId: string;
//     roleName: string;
//     roleCode: string;
//     roleDescription: string;
//     companyCategoryId: string;
//     companyCategoryName: string;
//     isCheck: boolean;
// }

export interface UserMenuAccessUpdate {
    userId: string;
    companyId: string;
    assignedRoles: DxrRole[],
    accessibleMenuListOfUser: MenuAccessInfo[]
}



export interface AccessDef {
    accessDefId: string;
    accessTitle: string;
}



