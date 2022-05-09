export interface FaqTypeUpdate {
    faqTypeId: String,
    faqType: String,
    faqTypeDescription: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}

export interface FaqInfoUpdate {
    faqInfoId: String,
    faqInfoQuestion: String,
    faqInfoAnswer: String,
    faqTypeId: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}


