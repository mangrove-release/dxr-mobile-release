import { AccessDef } from "./role-def-fetch";

export interface LanguageDef {
    backendDate: string;
    languageJson: string;
    langInfoCache: string;
    frontendDate: string;
    languageCompetencyId: string;
}

export interface CompanyCategoryFetch {
    companyCategoryId: String,
    companyCategoryName: String,
}

export interface UserCompanyAccess {
    companyId: string;
    companyName: string;
    userInfoId: string;
    userName: string;
    userMenuDef: UserMenuDef[];
}

export interface CompanyContext {
    companyId: string;
    companyName: string;
}

export interface MenuCategory {
    menuCategoryId: String,
    menuCategoryName: String,
}

export interface StaticPageFetch {
    staticPageId: string;
    staticContent: string;
    backendDate: string;
    frontendDate: string;
    dxrInfoCache: string;
}

export interface CacheUrlData {
    url: string,
    data: any
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