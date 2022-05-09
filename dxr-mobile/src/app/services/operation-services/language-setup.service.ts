import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrLanguageDef, LanguageDefinition } from 'src/app/models/language-def';
import { UriService } from '../visitor-services/uri.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageSetupService {

    constructor(private uriService: UriService) { }

    languageInfo: DxrLanguageDef = {
        languageCompetencyId: 'String',
        languageJson: [
            {
                "componentCode": "appRoot",
                "componentName": "Index Page",
                "labels": [
                    {
                        "key": "primaryMenuHead",
                        "eng": "DX-R",
                        "jpn": "DX-R"
                    },
                    {
                        "key": "login",
                        "eng": "Login",
                        "jpn": "ログイン"
                    },
                    {
                        "key": "logout",
                        "eng": "Log Out",
                        "jpn": "ログアウト"
                    },
                    {
                        "key": "companyUsingItTabHead",
                        "eng": "Company using it",
                        "jpn": "運営会社"
                    },
                    {
                        "key": "termsofUseTabHead",
                        "eng": "Terms of use",
                        "jpn": "利用規約"
                    },
                    {
                        "key": "privacyPolicyTabHead",
                        "eng": "Privacy Policy",
                        "jpn": "プライバシーポリシー"
                    }
                ],
                "messages": [
                    {
                        "key": "welcome message",
                        "eng": "Welcome",
                        "jpn": "いらっしゃいませ"
                    }
                ],
                "notifications": []
            },
            {
                "componentCode": "system-admin",
                "componentName": "System Admin Parent",
                "labels": [
                    {
                        "key": "secondaryMenuHead",
                        "eng": "System Admin",
                        "jpn": "システム管理者"
                    }
                ],
                "messages": [
                    {
                        "key": "welcomemessage",
                        "eng": "Welcome",
                        "jpn": "いらっしゃいませ"
                    }
                ],
                "notifications": []
            },
            {
                "componentCode": "faq-visitor",
                "componentName": "FAQ Visitor Parent",
                "labels": [
                    {
                        "key": "pageHeader",
                        "eng": "FAQ",
                        "jpn": "よくある質問"
                    },
                    {
                        "key": "faqTypeMenu",
                        "eng": "FAQ Type",
                        "jpn": "分類(カテゴリ)"
                    },
                    {
                        "key": "adminButton",
                        "eng": "Admin",
                        "jpn": "よある問 リト"
                    },
                    {
                        "key": "wasteTypeLabel",
                        "eng": "Type",
                        "jpn": "よ質問 リスト"
                    },
                    {
                        "key": "faqCatTabHeader",
                        "eng": "Category",
                        "jpn": "分類(カテゴリ)"
                    },
                    {
                        "key": "faqQnATabHeader",
                        "eng": "Questions & Answers",
                        "jpn": "質問と回答"
                    }
                ],
                "messages": [
                    {
                        "key": "welcome message",
                        "eng": "Welcome",
                        "jpn": "いらっしゃいませ"
                    }
                ],
                "notifications": []
            },
            {
                "componentCode": "faq-category",
                "componentName": "FAQ Category Tab",
                "labels": [
                    {
                        "key": "faqTypeListHeader",
                        "eng": "FAQ Categories",
                        "jpn": "分類(カテゴリ)"
                    },
                    {
                        "key": "faqCatDetailsButton",
                        "eng": "Detail",
                        "jpn": "Detail"
                    },
                    {
                        "key": "editBtn",
                        "eng": "Edit Questions",
                        "jpn": "質問を編集する"
                    }
                ],
                "messages": [
                    {
                        "key": "welcome message",
                        "eng": "Welcome",
                        "jpn": "いらっしゃいませ"
                    }
                ],
                "notifications": []
            },

        ],
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }


    getLanguageDef(callBack?: any) {
        var url = '/language-competency/language';
        var cacheUrl = url;
        this.uriService.callBackendWithCache(url, AppConstant.HTTP_GET, cacheUrl, {}, callBack);
    }

    updateLanguageDef(languageJsonData: string): Observable<DxrLanguageDef> {
        var url = '/language-competency/save';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, languageJsonData);
    }


}
