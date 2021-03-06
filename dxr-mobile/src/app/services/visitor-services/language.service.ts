import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from './uri.service';
import { Observable, of } from 'rxjs';
import { CompanyContext, UserCompanyAccess, UserMenuDef } from 'src/app/models/backend-fetch/dxr-system';

@Injectable({
    providedIn: 'root'
})

export class LanguageService {

    constructor(private cookieService: CookieService, private uriService: UriService) {

    }
    UI_LABELS: any = [];

    prepareMobileAppMenu(menuList: any[]) {

        var mobileAppMenuIds = AppConstant.MOBILE_MENU_IDS;

        var preparedMenuList: any[] = [];

        menuList = menuList.filter(item => mobileAppMenuIds.includes(item.menuId));

        menuList.forEach(firstLevelMenu => {
            if (firstLevelMenu.child && firstLevelMenu.child.length > 0) {
                firstLevelMenu.child.filter(firstChild => mobileAppMenuIds.includes(firstChild.menuId));

                firstLevelMenu.child.forEach(secondLevelMenu => {
                    if (secondLevelMenu.child && secondLevelMenu.child.length > 0) {
                        secondLevelMenu.child.filter(secondChild => mobileAppMenuIds.includes(secondChild.menuId));

                        secondLevelMenu.child.forEach(thirdLevelMenu => {
                            thirdLevelMenu.child.filter(thirdChild => mobileAppMenuIds.includes(thirdChild.menuId));

                        });
                    }


                });
            }


        });

        return menuList;
    }

    public getSelectedLanguageIndex() {
        return this.cookieService.get(AppConstant.LANG_INDEX_KEY);
    }

    setLanguageDefData(languageDef: any) {

        try {
            if (languageDef) {
                var languageData = JSON.parse(languageDef);
                this.UI_LABELS = languageData;
            } else {
                throw new Error;
            }

        } catch (error) {
            // this.snakebar.open('Failed to load language definition. Please chekc provided Language File', '', {
            //     duration: 3000,
            //     verticalPosition: 'top'
            // })
            this.UI_LABELS = this.DEFAULT_LANGUAGE_DEF;
        }


    }

    public getUiLabels(compCode: string, labelType: string) {


        var langIndex = this.getSelectedLanguageIndex();
        var resultLabels = {};

        if (this.UI_LABELS) {
            var componentInfo = this.getComponentInfo(compCode, labelType);
            if (componentInfo && componentInfo.length > 0) {
                resultLabels = this.getLangSpecificLabels(componentInfo, langIndex);
            }
        }

        return resultLabels;

    }

    getComponentInfo(compCode: string, labelType: string) {
        var componentInfo: any = [];
        if (this.UI_LABELS) {
            this.UI_LABELS.forEach((element: { componentCode: string; labels: any; messages: any; notifications: any; }) => {
                if (element.componentCode == compCode) {
                    if (labelType == 'labels') {
                        componentInfo = element.labels;
                    } else if (labelType == 'messages') {
                        componentInfo = element.messages;
                    } else if (labelType == 'notifications') {
                        componentInfo = element.notifications;
                    }
                    else if (labelType == AppConstant.UI_MENU_LIST) {
                        componentInfo = this.getMenuListOfComponent(compCode);
                    }
                }
            });
        }

        return componentInfo;
    }

    getMenuListOfComponent(compCode: string) {
        var componentInfo: any = [];
        if (this.MENU_LIST) {
            this.MENU_LIST.forEach(element => {
                if (element.componentCode == compCode) {

                    componentInfo = element.menus;

                }
            });
        }

        return componentInfo;
    }

    getLangSpecificLabels(labels: any, langAttr: string) {

        var resultLabels: any = {};
        if (labels) {
            labels.forEach((element: any) => {
                resultLabels[element.key] = element[langAttr];
            });
        }

        return resultLabels;
    }

    getSecondaryMenuList(parentMenuId: string) {

        var secondaryMenuList: any = [];


        if (this.UI_LABELS) {

            var secondaryMenuItems: any[] = this.getSecondaryMenuItems(parentMenuId);

            var langIndex = this.getSelectedLanguageIndex();

            var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

            if (secondaryMenuItems && secondaryMenuItems.length > 0) {

                secondaryMenuItems.forEach((element: any) => {
                    var menu = element;
                    menu.menuTitle = element[menuTitle];
                    // var menu = {
                    //     menuId: element.menuId,
                    //     menuTitle: element[menuTitle],
                    //     menuUrl: element.menuUrl,
                    //     parentSegment: '',
                    //     child: <any>[]
                    // };

                    // if (element.parentSegment) {
                    //     menu.parentSegment = element.parentSegment;
                    // }
                    if (menu.child) {
                        menu.child.forEach((childElement: any) => {
                            childElement.menuTitle = childElement[menuTitle];
                            // var childMenu = {
                            //     menuId: childElement.menuId,
                            //     menuTitle: childElement[menuTitle],
                            //     menuUrl: childElement.menuUrl,
                            //     parentSegment: '',
                            // };

                            // if (childElement.parentSegment) {
                            //     childMenu.parentSegment = childElement.parentSegment;
                            // }
                            // menu.child.push(childMenu);
                        });
                    }
                    secondaryMenuList.push(menu);
                });

            }
        }

        return secondaryMenuList;

    }

    getSecondaryMenuItems(parentMenuId: string) {
        var secondaryMenulist: UserMenuDef[] = [];
        if (parentMenuId) {
            this.USER_MENU_ITEMS.forEach((menu) => {
                if (parentMenuId == menu.menuId) {
                    secondaryMenulist = menu.child
                }
                else if (menu) {
                    menu.child.forEach((secondaryMenu: UserMenuDef) => {
                        if (secondaryMenu.menuId == parentMenuId) {
                            secondaryMenulist = secondaryMenu.child;
                        }
                    })
                }


            })

        }

        return secondaryMenulist
    }

    getUserInfoId(currentCompanyId: string) {
        var userInfoId: string = '';

        for (let index = 0; index < this.USER_ACCESS_INFO.length; index++) {
            const element = this.USER_ACCESS_INFO[index];
            if (element.companyId == currentCompanyId) {
                userInfoId = element.userInfoId;
                break;
            }
        }

        return userInfoId;

    }

    getUserName(currentCompanyId: string) {
        var userName: string = '';

        for (let index = 0; index < this.USER_ACCESS_INFO.length; index++) {
            const element = this.USER_ACCESS_INFO[index];
            if (element.companyId == currentCompanyId) {
                userName = element.userName;
                break;
            }
        }

        return userName;

    }

    setCurrentContextMenuItems(menus: UserCompanyAccess[], previouslySelectedCompanyId?: string) {

        if (menus && menus.length > 0) {
            if (previouslySelectedCompanyId) {
                menus.forEach(element => {
                    if (element.companyId == previouslySelectedCompanyId) {
                        this.USER_MENU_ITEMS = element.userMenuDef;
                    }
                });
            } else {
                this.USER_MENU_ITEMS = menus[0].userMenuDef;
            }

        }
    }

    resetUserMenuItems() {
        this.USER_MENU_ITEMS = [];
    }

    getUserMenuItems() {

        var menuList: any[] = [];
        var langIndex = this.getSelectedLanguageIndex();

        var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

        var commonMenus: [] = this.getCommonMenuItems();
        if (commonMenus && commonMenus.length > 0) {
            commonMenus.forEach(eachMenu => {
                menuList.push(eachMenu);
            })

        }

        if (this.USER_MENU_ITEMS && this.USER_MENU_ITEMS.length > 0) {

            this.USER_MENU_ITEMS.forEach((element: any) => {
                var menu = element;
                menu.menuTitle = element[menuTitle];
                // {
                //     menuId: element.menuId,
                //     menuTitle: element[menuTitle],
                //     menuUrl: element.menuUrl,
                //     parentSegment: '',
                //     child: <any>[]
                // };

                // if (element.parentSegment) {
                //     menu.parentSegment = element.parentSegment;
                // }
                if (menu.child) {
                    menu.child.forEach((childElement: any) => {
                        childElement.menuTitle = childElement[menuTitle];
                        // var childMenu = {
                        //     menuId: childElement.menuId,
                        //     menuTitle: childElement[menuTitle],
                        //     menuUrl: childElement.menuUrl,
                        //     parentSegment: '',
                        // };

                        // if (childElement.parentSegment) {
                        //     childMenu.parentSegment = childElement.parentSegment;
                        // }
                        // menu.child.push(childMenu);
                    });
                }
                menuList.push(menu);
            });

        }
        return menuList;
    }

    getCommonMenuItems() {
        var menuList: any = [];
        var langIndex = this.getSelectedLanguageIndex();

        var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

        if (this.COMMON_MENU_ITEMS && this.COMMON_MENU_ITEMS.length > 0) {


            this.COMMON_MENU_ITEMS.forEach((element: any) => {
                var menu = {
                    menuId: element.menuId,
                    menuTitle: element[menuTitle],
                    menuUrl: element.menuUrl,
                    parentSegment: '',
                    child: <any>[]
                };

                if (element.parentSegment) {
                    menu.parentSegment = element.parentSegment;
                }
                if (element.child) {
                    element.child.forEach((childElement: any) => {
                        var childMenu = {
                            menuId: childElement.menuId,
                            menuTitle: childElement[menuTitle],
                            menuUrl: childElement.menuUrl,
                            parentSegment: '',
                        };

                        if (childElement.parentSegment) {
                            childMenu.parentSegment = childElement.parentSegment;
                        }
                        menu.child.push(childMenu);
                    });
                }
                menuList.push(menu);
            });

        }

        return menuList;
    }

    setUserAccessInfo(userAccessInfo: any[]) {
        if (userAccessInfo && userAccessInfo.length > 0) {
            this.USER_ACCESS_INFO = userAccessInfo;
        }
    }

    getEnrolledCompanyList(): CompanyContext[] {
        var companyContextList: CompanyContext[] = [];
        if (this.USER_ACCESS_INFO) {
            this.USER_ACCESS_INFO.forEach(element => {
                var companyContextInfo: CompanyContext = {
                    companyId: element.companyId,
                    companyName: element.companyName
                }
                companyContextList.push(companyContextInfo);
            });
        }

        return companyContextList;

    }

    getCurrentCompany(companyId: string): CompanyContext {
        var companyContextInfo: CompanyContext = {} as CompanyContext;

        if (this.USER_ACCESS_INFO) {
            this.USER_ACCESS_INFO.forEach(element => {
                if (element.companyId == companyId) {
                    companyContextInfo = {
                        companyId: element.companyId,
                        companyName: element.companyName
                    }
                }

            });
        }
        return companyContextInfo;
    }

    resetUserAccessInfo() {
        this.USER_ACCESS_INFO = [];

    }

    USER_ACCESS_INFO: UserCompanyAccess[] = [];

    USER_MENU_ITEMS: UserMenuDef[] = [];

    COMMON_MENU_ITEMS: any[] = [
        {
            menuId: 'homeMenu',
            menuTitleEng: 'Home',
            menuTitleJpn: 'Home',
            menuUrl: 'home',
            parentSegment: '',
            menuParent: '',
            companyCategoryId: '',
            menuTypeId: '',
            child: [],
        },
        // {
        //     menuId: 'load',
        //     menuTitleEng: 'Load',
        //     menuTitleJpn: 'Load',
        //     menuUrl: 'load',
        //     parentSegment: '',
        //     menuParent: '',
        //     companyCategoryId: '',
        //     menuTypeId: '',
        //     child: []
        // },
        // {
        //     menuId: 'unload',
        //     menuTitleEng: 'Unload',
        //     menuTitleJpn: 'Unload',
        //     menuUrl: 'unload',
        //     parentSegment: '',
        //     menuParent: '',
        //     companyCategoryId: '',
        //     menuTypeId: '',
        //     child: []
        // }
    ];

    DEFAULT_LANGUAGE_DEF = [
        {
            "componentCode": "appRoot",
            "componentName": "Primary Menu",
            "labels": [
                {
                    "key": "primaryMenuHead",
                    "eng": "DX-R",
                    "jpn": "DX-R"
                },
                {
                    "key": "login",
                    "eng": "Login",
                    "jpn": "????????????"
                },
                {
                    "key": "logout",
                    "eng": "Log Out",
                    "jpn": "???????????????"
                },
                {
                    "key": "companyUsingItTabHead",
                    "eng": "Company using it",
                    "jpn": "????????????"
                },
                {
                    "key": "termsofUseTabHead",
                    "eng": "Terms of use",
                    "jpn": "????????????"
                },
                {
                    "key": "privacyPolicyTabHead",
                    "eng": "Privacy Policy",
                    "jpn": "??????????????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "system-admin",
            "componentName": "System Admin Menu",
            "labels": [
                {
                    "key": "secondaryMenuHead",
                    "eng": "System Admin",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-visitor",
            "componentName": "FAQ Visitor",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "FAQ",
                    "jpn": "??????????????????"
                },
                {
                    "key": "faqTypeMenu",
                    "eng": "FAQ Type",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "adminButton",
                    "eng": "Admin",
                    "jpn": "?????????"
                },
                {
                    "key": "wasteTypeLabel",
                    "eng": "Type",
                    "jpn": "??????????????????"
                },
                {
                    "key": "faqCatTabHeader",
                    "eng": "Category",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "faqQnATabHeader",
                    "eng": "Questions & Answers",
                    "jpn": "???????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-category",
            "componentName": "FAQ Catagory",
            "labels": [
                {
                    "key": "faqTypeListHeader",
                    "eng": "FAQ Categories",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "faqCatDetailsButton",
                    "eng": "Detail",
                    "jpn": "??????"
                },
                {
                    "key": "editBtn",
                    "eng": "Edit Questions",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-question-answer",
            "componentName": "FAQ Question And Answer",
            "labels": [
                {
                    "key": "editBtn",
                    "eng": "Edit Questions",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-admin",
            "componentName": "FAQ Admin",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "FAQ",
                    "jpn": "??????????????????"
                },
                {
                    "key": "faqTypeMenu",
                    "eng": "FAQ Type",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "adminButton",
                    "eng": "Admin",
                    "jpn": "?????????"
                },
                {
                    "key": "wasteTypeLabel",
                    "eng": "Type",
                    "jpn": "??????????????????"
                },
                {
                    "key": "faqCatTabHeader",
                    "eng": "Category ",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "faqQnATabHeader",
                    "eng": "Questions & Answers",
                    "jpn": "???????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-category-admin",
            "componentName": "FAQ Catagory Admin",
            "labels": [
                {
                    "key": "listHeader",
                    "eng": "FAQ Categories",
                    "jpn": "??????(????????????)"
                },
                {
                    "key": "addButton",
                    "eng": "Add Category",
                    "jpn": "???????????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "add-faq-category-form",
            "componentName": "FAQ Form",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Add Category",
                    "jpn": "???????????????????????????"
                },
                {
                    "key": "questionLabel",
                    "eng": "Title",
                    "jpn": "Title"
                },
                {
                    "key": "answerLabel",
                    "eng": "Description",
                    "jpn": "??????"
                },
                {
                    "key": "addBtn",
                    "eng": "Add",
                    "jpn": "????????????"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "??????"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "???????????????"
                }
            ],
            "messages": [
                {
                    "key": "faqTypeValidation",
                    "eng": "Please enter the FAQ type",
                    "jpn": "Please enter the FAQ type"
                },
                {
                    "key": "faqDescriptionValidation",
                    "eng": "Please enter the FAQ description",
                    "jpn": "Please enter the FAQ description"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "subscriptionForm",
            "componentName": "Subscription Form",
            "labels": [
                {
                    "key": "title",
                    "eng": "Subscription Form",
                    "jpn": "????????????"
                },
                {
                    "key": "companyName",
                    "eng": "Comp. Name",
                    "jpn": "?????????????????????*"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "??????*"
                },
                {
                    "key": "conatctNo",
                    "eng": "Contact No",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "subscriptionEmail",
                    "eng": "Subscription Email",
                    "jpn": "?????????????????????????????????* "
                },
                {
                    "key": "companyCategory",
                    "eng": "Select Buss.Type",
                    "jpn": "????????????*"
                },
                {
                    "key": "humanVerification",
                    "eng": "Human Verification",
                    "jpn": "????????????"
                },
                {
                    "key": "termsCondition",
                    "eng": "I confirm and agree to the terms of use and privacy policy",
                    "jpn": "??????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "key": "subscribe",
                    "eng": "Apply",
                    "jpn": "??????"
                },
                {
                    "key": "dumper",
                    "eng": "Dumper",
                    "jpn": "???????????????"
                },
                {
                    "key": "processor",
                    "eng": "Processor",
                    "jpn": "???????????????"
                },
                {
                    "key": "transporter",
                    "eng": "Transporter",
                    "jpn": "???????????????"
                },
                {
                    "key": "subscriberName",
                    "eng": "Subscriber Name",
                    "jpn": "????????????*"
                },
                {
                    "key": "subscriberMail",
                    "eng": "Subscriber Mail",
                    "jpn": "?????????????????????*"
                },
                {
                    "key": "zipCode",
                    "eng": "??? Zip Code",
                    "jpn": "???"
                },
                {
                    "key": "selctMultiple",
                    "eng": "* You can select multiple ",
                    "jpn": "?????????????????????1??????????????????????????????"
                },
                {
                    "key": "asAdmin",
                    "eng": "???The applicant will be considered as admin",
                    "jpn": "??????????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "key": "submit",
                    "eng": "Apply",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "companyNameValidator",
                    "eng": "You need to fill up the company name",
                    "jpn": "???????????????????????????"
                },
                {
                    "key": "subscriberNameValidator",
                    "eng": "You need to provide a subsc. Name",
                    "jpn": "????????????*??????????????????????????????????????????????????????????????????"
                },
                {
                    "key": "addressValidator",
                    "eng": "Please enter and specify the address",
                    "jpn": "????????????????????????????????????"
                },
                {
                    "key": "contactNoValidator",
                    "eng": "Please Enter Your 10 Digit Contact Number",
                    "jpn": "10?????????????????????????????????????????????????????????"
                },
                {
                    "key": "subscriptionEmailValidator",
                    "eng": "Please enter and specify your e-mail address",
                    "jpn": "???????????????????????????????????????????????????"
                },
                {
                    "key": "subscriberMailValidator",
                    "eng": "Please enter and specify your e-mail address",
                    "jpn": "???????????????????????????????????????????????????"
                },
                {
                    "key": "catagoryValidator",
                    "eng": "You need to select business type at least one type",
                    "jpn": "???????????????1???????????????????????????????????????????????????????????????"
                },
                {
                    "key": "isAgreeValidator",
                    "eng": "Please agree to the terms of use and privacy policy",
                    "jpn": "???????????????????????????????????????????????????????????????????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "subscription-success-popup",
            "componentName": "Subscription Successfull Pop up",
            "labels": [],
            "messages": [
                {
                    "key": "successfullMsg",
                    "eng": "Thank you for your application.",
                    "jpn": "?????????????????????????????????????????????"
                },
                {
                    "key": "message1",
                    "eng": "Thank You For applying DXR as an -",
                    "jpn": "DXR????????????????????????????????????????????????????????? -"
                },
                {
                    "key": "message2",
                    "eng": "The person in charge will contact you with detailed information at a later date.",
                    "jpn": "??????????????????????????????????????????????????????????????????"
                },
                {
                    "key": "okbutton",
                    "eng": "Ok",
                    "jpn": "OK"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "???????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-question-answer-admin",
            "componentName": "FAQ Qustion Answer",
            "labels": [
                {
                    "key": "addButton",
                    "eng": "Add Questions",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-list",
            "componentName": "Subscription List",
            "labels": [
                {
                    "key": "subuscriptionList",
                    "eng": "Subscription List",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "filterBy",
                    "eng": "Filter by",
                    "jpn": "???????????????"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "new",
                    "eng": "Filter New Application",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "accept",
                    "eng": "Filter Existing user list",
                    "jpn": "???????????????"
                },
                {
                    "key": "reject",
                    "eng": "Reject",
                    "jpn": "??????"
                },
                {
                    "key": "detail",
                    "eng": "Detail",
                    "jpn": "??????"
                },
                {
                    "key": "type",
                    "eng": "Company Type",
                    "jpn": "???????????????"
                },
                {
                    "key": "date",
                    "eng": "Date",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-submission-info",
            "componentName": "Subscription Submission Info",
            "labels": [
                {
                    "key": "title",
                    "eng": "Subscription Form",
                    "jpn": "????????????"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "?????????????????????*"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "??????*"
                },
                {
                    "key": "conatctNo",
                    "eng": "Contact No",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "subscriptionEmail",
                    "eng": "Subscription Email",
                    "jpn": "?????????????????????????????????"
                },
                {
                    "key": "companyCategory",
                    "eng": "Company Catagory",
                    "jpn": "????????????*"
                },
                {
                    "key": "subscriberName",
                    "eng": "Subscriber Name",
                    "jpn": "????????????*"
                },
                {
                    "key": "subscriberMail",
                    "eng": "Subscriber Mail",
                    "jpn": "?????????????????????*"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-list-popup",
            "componentName": "Subscription List Popup",
            "labels": [
                {
                    "key": "save",
                    "eng": "Save",
                    "jpn": "??????"
                },
                {
                    "key": "Details",
                    "eng": "Details",
                    "jpn": "??????"
                },
                {
                    "key": "Confirmation",
                    "eng": "Confirmation",
                    "jpn": "??????"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "???????????????"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-confirmation",
            "componentName": "Admin Subscription Confirmation",
            "labels": [
                {
                    "key": "status",
                    "eng": "Status",
                    "jpn": "??????"
                },
                {
                    "key": "accept",
                    "eng": "Approve",
                    "jpn": "??????"
                },
                {
                    "key": "reject",
                    "eng": "Reject",
                    "jpn": "??????"
                },
                {
                    "key": "title",
                    "eng": "Subscriber Appplication Confirmation",
                    "jpn": "???????????????????????????"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-add-question-answer",
            "componentName": "Add Question ",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Add Questions ",
                    "jpn": "???????????????"
                },
                {
                    "key": "questionLabel",
                    "eng": "Question",
                    "jpn": "??????"
                },
                {
                    "key": "answerLabel",
                    "eng": "Answer",
                    "jpn": "??????"
                },
                {
                    "key": "addBtn",
                    "eng": "Add",
                    "jpn": "??????"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "??????"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "???????????????"
                }
            ],
            "messages": [
                {
                    "key": "faqQuestionValidator",
                    "eng": "Please enter the FAQ question",
                    "jpn": "Please enter the FAQ question"
                },
                {
                    "key": "faqAnswerValidator",
                    "eng": "Please enter the FAQ answer",
                    "jpn": "Please enter the FAQ answer"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "superAdmin",
            "componentName": "Super Admin",
            "labels": [
                {
                    "key": "secondaryMenuHead",
                    "eng": "Super Admin",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "userLogin",
            "componentName": "User Login",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "User Login",
                    "jpn": "????????????????????????"
                },
                {
                    "key": "userId",
                    "eng": "User Id",
                    "jpn": "????????????ID"
                },
                {
                    "key": "password",
                    "eng": "Password",
                    "jpn": "???????????????"
                },
                {
                    "key": "loginBtn",
                    "eng": "Login",
                    "jpn": "????????????"
                },
                {
                    "key": "forgetPassBtn",
                    "eng": "Forget Password",
                    "jpn": "??????????????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "inquiry-form",
            "componentName": "Inquiry Form",
            "labels": [
                {
                    "key": "inquiryFormTitle",
                    "eng": "Inquiry",
                    "jpn": "??????????????????"
                },
                {
                    "key": "companyName",
                    "eng": "Com name ",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "personName",
                    "eng": "Name",
                    "jpn": "???????????????"
                },
                {
                    "key": "contactNo",
                    "eng": "Contact No",
                    "jpn": "????????????(??????)"
                },
                {
                    "key": "emailAddress",
                    "eng": "Mail*",
                    "jpn": "?????????????????????*"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject*",
                    "jpn": "???????????????*"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail*",
                    "jpn": "???????????????*"
                },
                {
                    "key": "humanVarification",
                    "eng": "Human Varification",
                    "jpn": "??????????????????"
                },
                {
                    "key": "agreedTerms",
                    "eng": "Privacy Please read and agree to the privacy policy before sending.",
                    "jpn": "????????????????????????????????????????????????????????????????????????????????????"
                },
                {
                    "key": "submit",
                    "eng": "Send",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "contactNoValidator",
                    "eng": "If Contact no file input text text is not allowed",
                    "jpn": "???????????????????????????????????????????????????????????????"
                },
                {
                    "key": "emailAddressValidator",
                    "eng": "Need to fill up the Correct mail formate",
                    "jpn": "??????????????????????????????????????????????????????"
                },
                {
                    "key": "inquiryTitleValidator",
                    "eng": "You cannot keep the subject empty",
                    "jpn": "????????????????????????????????????????????????"
                },
                {
                    "key": "inquiryDetailValidator",
                    "eng": "You cannot keep the details empty",
                    "jpn": "??????????????????????????????????????????????????????"
                },
                {
                    "key": "isAgreedValidator",
                    "eng": "Please agree to the terms of use and privacy policy",
                    "jpn": "???????????????????????????????????????????????????????????????????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "inquiry-tabs",
            "componentName": "Inquiry Tabs",
            "labels": [
                {
                    "key": "inquiryListTabTitle",
                    "eng": "Inquiry List",
                    "jpn": "???????????????"
                },
                {
                    "key": "inquiryresonseTabTitle",
                    "eng": "Inquiry Response",
                    "jpn": "???????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "inquiry-info-list",
            "componentName": "Inquiry List",
            "labels": [
                {
                    "key": "inquiryListTitle",
                    "eng": "Inquiry List",
                    "jpn": "???????????????"
                },
                {
                    "key": "filterBy",
                    "eng": "Status ",
                    "jpn": "??????"
                },
                {
                    "key": "new",
                    "eng": "Unanswered",
                    "jpn": "?????????"
                },
                {
                    "key": "answer",
                    "eng": "Answered",
                    "jpn": "????????????"
                },
                {
                    "key": "submitionDateTime",
                    "eng": "Date & Time",
                    "jpn": "??????"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject",
                    "jpn": "??????"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail",
                    "jpn": "??????"
                },
                {
                    "key": "response",
                    "eng": "Response",
                    "jpn": "??????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "app-response",
            "componentName": "Inqury Response",
            "labels": [
                {
                    "key": "inquiryInfoTitle",
                    "eng": "Inquirer",
                    "jpn": "????????????"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "personName",
                    "eng": "Name",
                    "jpn": "???????????????"
                },
                {
                    "key": "contactNo",
                    "eng": "Contact No",
                    "jpn": "????????????(??????)"
                },
                {
                    "key": "emailAddress",
                    "eng": "Mail",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject",
                    "jpn": "???????????????"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail",
                    "jpn": "???????????????"
                },
                {
                    "key": "reply",
                    "eng": "Reply",
                    "jpn": "??????????????????????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "inquiry-reply",
            "componentName": "Inquiry Reply",
            "labels": [
                {
                    "key": "replypopupTitle",
                    "eng": "ADD Inquiry Reply",
                    "jpn": "??????????????????????????????"
                },
                {
                    "key": "send",
                    "eng": "Send",
                    "jpn": "??????"
                },
                {
                    "key": "close",
                    "eng": "Close",
                    "jpn": "?????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "admin-system-overview",
            "componentName": "Admin System Overview ",
            "labels": [
                {
                    "key": "costingTabHead",
                    "eng": "Costing",
                    "jpn": "???????????????"
                },
                {
                    "key": "caseStudyTabHead",
                    "eng": "Case Study",
                    "jpn": "????????????"
                },
                {
                    "key": "introductionFlowTabHead",
                    "eng": "Introduction Flow ",
                    "jpn": "???????????????"
                },
                {
                    "key": "howToUseItTabHead",
                    "eng": "How to use it",
                    "jpn": "????????????"
                },
                {
                    "key": "companyUsingItTabHead",
                    "eng": "Company Using it",
                    "jpn": "????????????"
                },
                {
                    "key": "privacyPolicyTabHead",
                    "eng": "Privacy Policy ",
                    "jpn": "??????????????????????????????"
                },
                {
                    "key": "termsOfUseTabHead",
                    "eng": "Terms of Use",
                    "jpn": "????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "howToUseItTab",
            "componentName": "How to use it Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "How to use it",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "caseStudyTab",
            "componentName": "Case Study Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Case study",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "termsOfUseTab",
            "componentName": "Terms of Use Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Terms of Use",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "clientListTab",
            "componentName": "Client List Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Company Using IT",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "changePassword",
            "componentName": "Change Password",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Change Password",
                    "jpn": "????????????????????????"
                },
                {
                    "key": "userId",
                    "eng": "User Id",
                    "jpn": "????????????ID"
                },
                {
                    "key": "sendAccessCodeBtn",
                    "eng": "Send Access Code",
                    "jpn": "??????????????????????????????"
                },
                {
                    "key": "accessCode",
                    "eng": "User ID & Password",
                    "jpn": "????????????ID??????????????????"
                },
                {
                    "key": "newPassword",
                    "eng": "New Password",
                    "jpn": "??????????????????"
                },
                {
                    "key": "confirmPassword",
                    "eng": "Confirm Password",
                    "jpn": "????????????????????????(???)"
                },
                {
                    "key": "changePassword",
                    "eng": "Change Password",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "submition-popup",
            "componentName": "Inquiry Submission Popup",
            "labels": [
                {
                    "key": "submissionmessage",
                    "eng": "Your inquiry submitted successfully",
                    "jpn": "???????????????????????????????????????????????????"
                },
                {
                    "key": "submissionmessagetitle",
                    "eng": "Successful messege title",
                    "jpn": "?????????????????????????????????"
                },
                {
                    "key": "okBtn",
                    "eng": "Ok",
                    "jpn": "Ok"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "terms-condition-popup",
            "componentName": "Terms and Condition Popup",
            "labels": [
                {
                    "key": "iagree",
                    "eng": "I Agree",
                    "jpn": "????????????"
                },
                {
                    "key": "termsConditionTitle",
                    "eng": "Terms and Condition",
                    "jpn": "???????????? ??????????????????????????????"
                },
                {
                    "key": "termsConditionContent",
                    "eng": " Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.",
                    "jpn": "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ????????????????????????"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "validation-report-popup",
            "componentName": "Validation Report Popup",
            "labels": [
                {
                    "key": "validationReportTitle",
                    "eng": "Please Provide Correct Information",
                    "jpn": "?????????????????????????????????????????????"
                },
                {
                    "key": "validationMessage",
                    "eng": "Message",
                    "jpn": "???????????????"
                },
                {
                    "key": "ok",
                    "eng": "OK",
                    "jpn": "OK"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "introductionFlowTab",
            "componentName": "Introduction Flow Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Introduction Flow ",
                    "jpn": "???????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "companyUsingItTab",
            "componentName": "Company Using It Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Company Using it",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "costingTab",
            "componentName": "Costing Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Costing",
                    "jpn": "???????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "termsofUsed",
            "componentName": "Terms of Used Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Terms of use",
                    "jpn": "????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "privacyPolicy",
            "componentName": "Privacy Policy Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Privacy Policy",
                    "jpn": "??????????????????????????????"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "??????"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "????????????"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "create-dxr-admin",
            "componentName": "Create DXR Admin",
            "labels": [
                {
                    "key": "formTitle",
                    "eng": "Create DXR Admin",
                    "jpn": "DXR???????????????"
                },
                {
                    "key": "fullName",
                    "eng": "Full Name",
                    "jpn": "??? ???"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "??????"
                },
                {
                    "key": "deptTitle",
                    "eng": "Department Title",
                    "jpn": "???????????????"
                },
                {
                    "key": "email",
                    "eng": "Email",
                    "jpn": "?????????????????????"
                },
                {
                    "key": "mobile",
                    "eng": "mobile",
                    "jpn": "????????????"
                },
                {
                    "key": "createBtn",
                    "eng": "Create",
                    "jpn": "????????????"
                },
                {
                    "key": "resenCodeBtn",
                    "eng": "Resend Code",
                    "jpn": "?????????????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "set-dxr-admin",
            "componentName": "Set Dxr Admin",
            "labels": [
                {
                    "key": "formTitle",
                    "eng": "Set DXR Admin Access",
                    "jpn": "DXR??????????????????????????????????????????"
                },
                {
                    "key": "fullName",
                    "eng": "Access",
                    "jpn": "Access"
                },
                {
                    "key": "createBtn",
                    "eng": "Set DXR Admin Access",
                    "jpn": "????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-definition-admin",
            "componentName": "Role Definition",
            "labels": [
                {
                    "key": "dumperTab",
                    "eng": "Dumper",
                    "jpn": "???????????????"
                },
                {
                    "key": "transporterTab",
                    "eng": "Transporter",
                    "jpn": "???????????????"
                },
                {
                    "key": "processorTab",
                    "eng": "Proccessor",
                    "jpn": "???????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-def-list",
            "componentName": "Role Def Menu List",
            "labels": [
                {
                    "key": "menuLabel",
                    "eng": "Menu",
                    "jpn": "????????????"
                },
                {
                    "key": "menuGroupLabel",
                    "eng": "Menu Group",
                    "jpn": "Menu Group"
                },
                {
                    "key": "roleLabel",
                    "eng": "Role",
                    "jpn": "Role"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "??????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-assign-popup",
            "componentName": "Role Def Assign Popup",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Role Access",
                    "jpn": "Role Access"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "??????"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "???????????????"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "componentList",
            "route": "",
            "labels": [
                {
                    "key": "componentList",
                    "eng": "Component List",
                    "jpn": "Component List"
                },
                {
                    "key": "saveBtn",
                    "eng": "Save",
                    "jpn": "Save"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "languageSetupPopup",
            "route": "",
            "labels": [
                {
                    "key": "componentCode",
                    "eng": "Component Code",
                    "jpn": "component Code"
                },
                {
                    "key": "componentName",
                    "eng": "Component Name",
                    "jpn": "Component Name"
                },
                {
                    "key": "uiLabel",
                    "eng": "Labels",
                    "jpn": "Labels"
                },
                {
                    "key": "messages",
                    "eng": "Messages",
                    "jpn": "Messages"
                },
                {
                    "key": "notification",
                    "eng": "Notification",
                    "jpn": "Notification"
                },
                {
                    "key": "invalidMessageContent",
                    "eng": "Incorrect JSON Format",
                    "jpn": "Incorrect JSON Format"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "Cancel"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        }
    ];

    MENU_LIST = [
        {
            "componentCode": "appRoot",
            "menus": [
                {
                    menuId: 'systemOverview',
                    menuTitleEng: 'System Overview',
                    menuTitleJpn: '??????????????????',
                    menuUrl: '/visitor/system-overview/0',
                },
                {
                    menuId: 'subscription',
                    menuTitleEng: 'Subscription',
                    menuTitleJpn: '????????????',
                    menuUrl: '/visitor/subscription'
                },
                {
                    menuId: 'faq',
                    menuTitleEng: 'FAQ',
                    menuTitleJpn: '??????????????????',
                    menuUrl: '/visitor/faq'
                },
                {
                    menuId: 'inquiry',
                    menuTitleEng: 'Inquiry',
                    menuTitleJpn: '?????????',
                    menuUrl: '/visitor/inquiry'
                },
                {
                    menuId: 'systemAdmin',
                    menuTitleEng: 'DXR Admin',
                    menuTitleJpn: 'DXR ?????????',
                    menuUrl: '/system-admin'
                },
                {
                    menuId: 'dxrSuperAdmin',
                    menuTitleEng: 'System Admin Op',
                    menuTitleJpn: '??????????????????????????????????????????',
                    menuUrl: '/super-admin',
                    child: [
                        {
                            menuId: 'createDxrAdmin',
                            menuTitleEng: 'Create DXR Admin',
                            menuTitleJpn: 'DXR????????????????????????',
                            menuUrl: 'super-admin/create-dxr-admin',
                            parentSegment: '',
                        },
                        {
                            menuId: 'setDxrAdminAccess',
                            menuTitleEng: 'Set DXR Admin Access',
                            menuTitleJpn: 'DXR????????????????????????????????????',
                            menuUrl: 'super-admin/set-dxr-admin-access',
                            parentSegment: ''
                        },
                        {
                            menuId: 'setCompanyAdminAccess',
                            menuTitleEng: 'Set Company Admin Access',
                            menuTitleJpn: '?????????????????????????????????????????????',
                            menuUrl: 'super-admin/set-company-admin-access',
                            parentSegment: ''
                        },
                    ]
                },
            ],
        },
        {
            "componentCode": "system-admin",
            "menus": [
                {
                    menuId: "sysAdminSystemOverview",
                    menuTitleEng: "System Overview",
                    menuTitleJpn: "??????????????????",
                    menuUrl: "system-overview-admin",
                    parentSegment: "/system-admin",
                },
                {
                    menuId: "sysAdminSubscription",
                    menuTitleEng: "Subscription",
                    menuTitleJpn: "????????????",
                    menuUrl: "subscription-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminFaq",
                    menuTitleEng: "FAQ",
                    menuTitleJpn: "??????????????????",
                    menuUrl: "faq-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminInquiry",
                    menuTitleEng: "Inquiry",
                    menuTitleJpn: "?????????",
                    menuUrl: "inquiry-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminRoleDef",
                    menuTitleEng: "Role Definition",
                    menuTitleJpn: "???????????????",
                    menuUrl: "role-def-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminWasteDef",
                    menuTitleEng: "Waste Def",
                    menuTitleJpn: "Waste Def",
                    menuUrl: "waste-def-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminWasteRequest",
                    menuTitleEng: "Waste Request",
                    menuTitleJpn: "Waste Request",
                    menuUrl: "waste-request-admin",
                    parentSegment: "/system-admin"
                }
            ]
        },
        {
            "componentCode": "superAdmin",
            "menus": [
                {
                    menuId: 'superAdminOp',
                    menuTitleEng: 'Super Admin OP',
                    menuTitleJpn: 'Super Admin OP',
                    menuUrl: 'super-admin',
                    parentSegment: '',
                    child: [
                        {
                            menuId: 'createDxrAdmin',
                            menuTitleEng: 'Create DXR Admin',
                            menuTitleJpn: '??????????????????',
                            menuUrl: 'super-admin/',
                            parentSegment: '',
                        },
                        {
                            menuId: 'setDxrAdminAccess',
                            menuTitleEng: 'Set DXR Admin Access',
                            menuTitleJpn: '??????????????????',
                            menuUrl: 'super-admin/',
                            parentSegment: ''
                        },
                        {
                            menuId: 'setCompanyAdminAccess',
                            menuTitleEng: 'Set Company Admin Access',
                            menuTitleJpn: '?????????',
                            menuUrl: 'super-admin',
                            parentSegment: ''
                        },
                    ]
                },
            ],
        },
        {
            "componentCode": "componentList",
            "route": "",
            "labels": [
                {
                    "key": "componentList",
                    "eng": "Component List",
                    "jpn": "Component List"
                },
                {
                    "key": "saveBtn",
                    "eng": "Save",
                    "jpn": "Save"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "languageSetupPopup",
            "route": "",
            "labels": [
                {
                    "key": "componentCode",
                    "eng": "Component Code",
                    "jpn": "component Code"
                },
                {
                    "key": "componentName",
                    "eng": "Component Name",
                    "jpn": "Component Name"
                },
                {
                    "key": "uiLabel",
                    "eng": "Labels",
                    "jpn": "Labels"
                },
                {
                    "key": "messages",
                    "eng": "Messages",
                    "jpn": "Messages"
                },
                {
                    "key": "notification",
                    "eng": "Notification",
                    "jpn": "Notification"
                },
                {
                    "key": "invalidMessageContent",
                    "eng": "Incorrect JSON Format",
                    "jpn": "Incorrect JSON Format"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "Cancel"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },

    ]

}
