import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/config/app-constant';
import { ChangeUserIdentification, RedirectUserInfo, UserIdentification } from 'src/app/models/backend-update/user-login';
import { LanguageService } from './language.service';
import { UriService } from './uri.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(private http: HttpClient, private uriService: UriService, private utilService: UtilService) { }

    getMobileAppRedirectInfo(redirectUserInfoId: string): Observable<RedirectUserInfo> {
        var url = '/mob/redirect/get-mob-app-redirect-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, redirectUserInfoId);
    }

    setUserLoginCookie(userId: string, userAuth: string, companyId: string) {
        this.utilService.setUserIdCookie(userId);
        this.utilService.setUserAuthPassCookie(userAuth);
        this.utilService.setCompanyIdCookie(companyId);
    }


    public login(userIdentification: UserIdentification): Observable<any> {
        var url = '/user-management/login';
        var loginResponse: any;
        loginResponse = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);

        return loginResponse;
    }

    public getAccessInfo(userIdentification: UserIdentification): Observable<any> {
        var url = '/user-management/get-access-info';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }

    public chnagePassword(userIdentification: ChangeUserIdentification): Observable<string> {
        var url = '/user-management/change-password';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }

    public chnageFirstLoginPassword(userIdentification: UserIdentification): Observable<string> {
        var url = '/user-management/change-first-login-password';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }
}
