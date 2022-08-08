import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppConstant } from './config/app-constant';
import { CompanyContext } from './models/backend-fetch/dxr-system';
import { UserIdentification } from './models/backend-update/user-login';
import { DriverTabsDataService } from './services/operation-services/driver-tabs-data.service';
import { LanguageService } from './services/visitor-services/language.service';
import { UriService } from './services/visitor-services/uri.service';
import { UserLoginService } from './services/visitor-services/user-login.service';
import { UtilService } from './services/visitor-services/util.service';
import { ChangePasswordComponent } from './visitor/change-password/change-password.component';
import { SwitchContextComponent } from './visitor/switch-context/switch-context.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor(public modalController: ModalController, private languageService: LanguageService, public router: Router, private utilService: UtilService, private uriService: UriService, private userLoginService: UserLoginService, public actionSheetController: ActionSheetController, private activatedroute: ActivatedRoute, private driverTabsDataService: DriverTabsDataService) { }

    uiLabels: any = {};
    menuList: any = [];
    selectedMenu!: String;
    selectedMenuId: string = '';
    isLogedIn = false;


    profileArray: any = [];
    selectedProfileItem: string = '';
    selectedProfileFunction: any;
    selectedLangIndex = this.languageService.getSelectedLanguageIndex();
    languageArray = ['jpn', 'eng'];
    selectedLanguage: string = this.utilService.getSelectedLanguageIndex() ? this.utilService.getSelectedLanguageIndex() : this.languageArray[0];
    selectedLanguageModel: string = this.selectedLanguage;
    viewContent = false;

    componentCode: string = AppConstant.COMP.ADD_FAQ_CATEGORY_ADMIN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();
    redirectSessionId: string;
    ngOnInit() {
        const urlSegments = (window.location.href).split("/");
        this.redirectSessionId = urlSegments[urlSegments.length - 1].split("-").length == 5 ? urlSegments[urlSegments.length - 1] : null;

        if (!this.selectedLangIndex || this.selectedLangIndex == '') {
            this.utilService.setSelectedLanguageIndex(AppConstant.LANG_INDEX_JPN);
            this.selectedLanguage = AppConstant.LANG_INDEX_JPN;
        }

        // this.redirectSessionId = this.activatedroute.snapshot.queryParams.redirectSessionId;
    }

    ngAfterViewInit(): void {

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.getLanguage();


    }

    getLanguage(callBack?: any) {
        var backUrl = '/language-competency/language';
        var cacheUrl = backUrl;
        this.uriService.callBackendWithCache(backUrl, AppConstant.HTTP_GET, cacheUrl, {}, (data: any) => {
            if (data) {
                this.languageService.setLanguageDefData(data.languageJson);
                // this.utilService.printLangDef(this.uiLabels, this.componentCode);

                this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.APP_ROOT, AppConstant.UI_LABEL_TEXT);
                this.prepareProfileItem();
            }

            this.login();
            // this.initialLogin(callBack);

        });
    }

    login() {

        if (this.redirectSessionId && this.redirectSessionId.length > 16) {

            this.userLoginService.getMobileAppRedirectInfo(this.redirectSessionId).subscribe(response => {

                if (response) {
                    this.utilService.clearCookie();
                    setTimeout(() => {
                        this.languageService.resetUserAccessInfo();
                        this.languageService.resetUserMenuItems();

                        // setTimeout(() => { }, 10);

                        this.driverTabsDataService.setRedirectUserInfo(response);
                        this.userLoginService.setUserLoginCookie(response.userId, response.userAuth, response.companyId);

                        if (response.langIndex) {
                            this.utilService.setSelectedLanguageIndex(response.langIndex);
                            this.selectedLanguage = response.langIndex;
                        }
                        setTimeout(() => {
                            this.driverTabsDataService.setScannedTripInfo(response.tripQrData);
                            this.prepareUserAccessAndMenu(JSON.parse(response.userMenuAccess), () => {
                                debugger
                                this.viewContent = true;
                                setTimeout(() => {
                                    if (!this.router.url.includes(response.redirectMenuUrlParentSegment)) {
                                        this.router.navigate([response.redirectMenuUrlParentSegment, { outlets: { [response.redirectMenuOutlet]: [response.redirectMenuUrl] } }])
                                    }
                                }, 200);

                            });
                        }, 200);


                    }, 200);



                }
            });
        } else {
            this.initialLogin();
        }
    }

    initialLogin(callBack?: any) {

        var authId = this.utilService.getUserIdCookie();
        var authPass = this.utilService.getUserAuthPassCookie();

        if (authId && authPass) {

            var userIdentification: UserIdentification = {
                userId: authId,
                userAuth: authPass,
                oneTimeAccessFlag: ''
            }

            this.userLoginService.login(userIdentification).subscribe(data => {

                this.prepareUserAccessAndMenu(data, callBack);
            });

        } else {
            this.prepareUserAccessAndMenu();
        }

    }

    prepareUserAccessAndMenu(data?: any, callBack?: any) {

        if (data && data.length > 0) {
            this.isLogedIn = true;
            var previouslySelectedCompanyId = this.utilService.getCompanyIdCookie();

            this.languageService.setUserAccessInfo(data);

            if (previouslySelectedCompanyId) {
                this.languageService.setCurrentContextMenuItems(data, previouslySelectedCompanyId);
            } else {
                this.languageService.setCurrentContextMenuItems(data);
            }

            this.setIsLoged(true);

        }

        this.reloadMenuList(callBack);
    }

    logOut(callBack?: any) {

        this.utilService.clearCookie();
        this.languageService.resetUserAccessInfo();
        this.languageService.resetUserMenuItems();
        this.setIsLoged(false);
        this.reloadMenuList(callBack);

    }

    setIsLoged(status: boolean) {
        this.isLogedIn = status;
    }

    reloadMenuList(callBack?: any) {

        this.menuList = this.languageService.getUserMenuItems();
        // var commonMenuItems: any[] = this.languageService.getCommonMenuItems();
        this.menuList = (this.languageService.prepareMobileAppMenu(this.menuList));
        // this.selectedMenu = this.menuList[0].menuTitle;

        if (callBack) {
            callBack();
        } else {
            this.router.navigate(['/home']);
            this.selectedMenuId = this.menuList[0].menuId;
            this.viewContent = true;
        }



    }

    prepareProfileItem() {
        this.uiLabels.profile = (this.uiLabels.profile != null) ? (this.uiLabels.profile) : 'Profile';
        this.uiLabels.switchCompany = (this.uiLabels.switchCompany != null) ? (this.uiLabels.switchCompany) : 'Switch Company';
        this.uiLabels.changePassword = (this.uiLabels.changePassword != null) ? (this.uiLabels.changePassword) : 'Change Password';
        this.profileArray = [
            {
                title: this.uiLabels.switchCompany,
                function: this.switchCompany
            },
            {
                title: this.uiLabels.changePassword,
                function: this.changePassword
            },
        ]

        this.selectedProfileItem = this.profileArray[0].title;
    }

    profileItemClick() {
        var itemIndex = this.profileArray.findIndex((item: any) => (item.title == this.selectedProfileItem));

        if (itemIndex >= 0) {
            this.profileArray[itemIndex].function(this.utilService, this.modalController, this.languageService);
        }
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'my-custom-class',
            buttons: [{
                text: this.uiLabels.switchCompany,
                handler: () => {
                    this.switchCompany(this.utilService, this.modalController, this.languageService);
                }
            },
            {
                text: this.uiLabels.changePassword,
                handler: () => {
                    this.changePassword(this.utilService, this.modalController, this.languageService);
                }
            }]
        });
        await actionSheet.present();

        // const { role, data } = await actionSheet.onDidDismiss();
    }

    async switchCompany(utilService: UtilService, modalController: ModalController, languageService: LanguageService) {
        var currentCompanyId = utilService.getCompanyIdCookie();
        var currentContextInfo: CompanyContext = languageService.getCurrentCompany(currentCompanyId);
        var contextList: CompanyContext[] = languageService.getEnrolledCompanyList();

        const modal = await modalController.create({
            component: SwitchContextComponent,
            componentProps: {
                companyContext: currentContextInfo,
                companyContextList: contextList
            }
        });

        return await modal.present();
    }

    async changePassword(utilService: UtilService, modalController: ModalController, languageService: LanguageService) {
        var authId = utilService.getUserIdCookie();
        const modal = await modalController.create({
            component: ChangePasswordComponent,
            componentProps: {
                userId: authId,
                fromProfile: true
            }
        });
        return await modal.present();

    }

    changeLanguage() {
        if (confirm('Page will reload')) {
            this.utilService.setSelectedLanguageIndex(this.selectedLanguage);

            window.location.assign('/');
        } else {
            this.selectedLanguage = (this.selectedLanguage == this.languageArray[0]) ? this.languageArray[1] : this.languageArray[0];
        }
    }


    setSelectedMenu(menuItem: any) {
        this.selectedMenuId = menuItem.menuId;
    }
}
