import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { JSEncrypt } from 'jsencrypt';
import { AppConstant } from 'src/app/config/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { UriService } from './uri.service';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private cookieService: CookieService) { }

    langIndex = this.getSelectedLanguageIndex();

    printLangDef(uiLabels: any, componentCode: string) {
        var langDef: string = '';
        var langDefHeader: string = '{\n \"componentCode\": \"' + componentCode + '\",\n\"componentName\": \"' + componentCode + '\",\n\"labels\": [\n';
        langDef = langDef.concat(langDefHeader);
        Object.keys(uiLabels).forEach((key, index) => {
            if (index > 0) {
                langDef = langDef.concat(',\n')
            }

            var langValueObject: string = '{\n\"key\" : \"' + key + '\",\n\"eng\" : \"' + uiLabels[key] + '\",\n\"jpn\" : \"' + uiLabels[key] + '\"\n}';
            langDef = langDef.concat(langValueObject);
        });
        langDef = langDef.concat('],\n\"messages\":[],\n\"notifications\":[]\n}\n');
        // console.log(langDef);
    }

    getCurrentDate() {
        return new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 8)
    }

    setSelectedLanguageIndex(langIndex: string) {
        this.cookieService.set(AppConstant.LANG_INDEX_KEY, langIndex);
    }

    setUserIdCookie(userId: string) {
        return this.cookieService.set(AppConstant.AUTH_ID_KEY, userId);
    }

    setUserAuthPassCookie(userAuth: string) {
        return this.cookieService.set(AppConstant.AUTH_PASS_KEY, userAuth);
    }

    setCompanyIdCookie(companyId: string) {
        return this.cookieService.set(AppConstant.SELECTED_COMPANY_ID_KEY, companyId);
    }

    getCompanyCategoryName(categoryNameOrId: string) {
        var langIndex = this.getSelectedLanguageIndex();
        var companyCategoryName: any = (langIndex == AppConstant.LANG_INDEX_ENG) ? AppConstant.COMPANY_CATEGORY_NAME[categoryNameOrId] : AppConstant.COMPANY_CATEGORY_NAME[categoryNameOrId];
        return (langIndex == AppConstant.LANG_INDEX_ENG) ? companyCategoryName[AppConstant.COMPANY_CATEGORY_TITLE_ENG] : companyCategoryName[AppConstant.COMPANY_CATEGORY_TITLE_JPN];
    }

    public getSelectedLanguageIndex() {
        return this.cookieService.get(AppConstant.LANG_INDEX_KEY);
    }

    languageEditMode(): boolean {
        var userId: any = this.getUserIdCookie();
        var isSystemAdmin: boolean = false;
        if (userId) {
            AppConstant.USER_EMAIL_FOR_LANGUAGE_UPDATE.forEach(sysAdminUserId => {

                if (sysAdminUserId == userId) {
                    isSystemAdmin = true;
                }
            });
        }
        return isSystemAdmin;
    }

    prepareCurrencySign(priceValue: number) {
        return AppConstant.JAPANESE_CURRENCY_SIGN + ' ' + priceValue;
    }

    prepareFaxNoFormate(faxNo: string): string {
        var formatedFaxNo: string = '';
        if (faxNo) {
            for (let index = 0; index < faxNo.length; index++) {
                formatedFaxNo = formatedFaxNo + faxNo[index];
                if (index == 1 || index == 5) {
                    formatedFaxNo += '-';
                }
            }
        }
        return formatedFaxNo;
    }

    prepareContactNoFormate(contactNo: string): string {
        var formateContactNo: string = '';
        if (contactNo) {
            for (let index = 0; index < contactNo.length; index++) {
                formateContactNo = formateContactNo + contactNo[index];
                if (index == 1 || index == 5) {
                    formateContactNo += '-';
                }
            }
        }
        return formateContactNo;
    }

    prepareZipCodeFormate(zipcode: string) {

        var formatedZipcode = '〒';
        if (zipcode) {
            for (let index = 0; index < zipcode.length; index++) {

                formatedZipcode = formatedZipcode + zipcode[index];
                if (index == 2)
                    formatedZipcode += '-';

            }
        }

        return formatedZipcode;

    }

    getUserIdCookie() {
        return this.cookieService.get(AppConstant.AUTH_ID_KEY);
    }

    getUserAuthPassCookie() {
        return this.cookieService.get(AppConstant.AUTH_PASS_KEY);
    }

    getCompanyIdCookie() {
        return this.cookieService.get(AppConstant.SELECTED_COMPANY_ID_KEY);
    }

    clearCookie() {
        this.cookieService.delete(AppConstant.AUTH_ID_KEY, '/');
        this.cookieService.delete(AppConstant.SELECTED_COMPANY_ID_KEY, '/');
        this.cookieService.delete(AppConstant.AUTH_PASS_KEY, '/');

    }

    convertFileToBase64(event: any, callBack: any) {
        var file = event.target.files[0];
        var convertFile: any;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            if (reader.result) {
                convertFile = (reader.result.toString());

                callBack(convertFile);
            }
        };
    }

    generateAlphaNumericPassword() {

        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        var pass = '';

        for (var i = 0; i < 8; i++) {

            pass += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

        }

        return pass;

    }

    generateUniqueId(): string {
        return uuidv4();
    }

    encrypt(password: string) {

        let publicKey2048 = AppConstant.DXR_AUTH_ID;

        let RSAEncrypt = new JSEncrypt();
        RSAEncrypt.setPublicKey(publicKey2048);

        return RSAEncrypt.encrypt(password);
    }

    checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}
