import { FaqTypeFetch, FaqInfoFetch } from "../backend-fetch/faq-fetch"

export interface FaqTypeView {
    faqTypeId: String,
    faqType: String,
    faqTypeDescription: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}

export interface FaqInfoView {
    faqInfoId: String,
    faqInfoQuestion: String,
    faqInfoAnswer: String,
    faqTypeId: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String

}

export interface FaqDetailView {
    faq: FaqTypeView,
    faqInfoList: FaqInfoView[]
}


