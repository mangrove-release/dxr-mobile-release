export interface LanguageDefinition {
    componentCode: String,
    componentName: String,
    labels: any[],
    messages: any[],
    notifications: any[]
};
export interface DxrLanguageDef {

    languageCompetencyId: String,
    languageJson: LanguageDefinition[],
    backendDate: String
    frontendDate: String
    dxrInfoCache: String
}

export interface DxrLanguageDefBack {

    languageCompetencyId: String,
    languageJson: string,
    backendDate: String
    frontendDate: String
    dxrInfoCache: String
}
export interface AddLangDefComponentView {
    languageInformation: LanguageDefinition;
    isAdd: boolean;
}