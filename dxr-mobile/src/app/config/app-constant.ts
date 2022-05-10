export class AppConstant {

    public static APP_VERSION = '1.4.2022.05.10';

    public static PICK_LOAD_STATUS = "1";
    public static PICK_UNLOAD_STATUS = "2";

    public static VERIFY_PACKAGE_MENU_URL = "processor-trip-verify";
    public static WEIGHT_DECLARE_MENU_URL = "processor-weight-dclr";
    public static PROCESSOR_RECEIVE_MENU_URL = "processor-waste-receive";

    public static TRUE_STATEMENT = "1";
    public static FALSE_STATEMENT = "0";

    public static LUMPSUM_QUNATITY = "lumpsumQuantity";
    public static CALCULATED_QUANTITY = "packageQuantity";

    public static DUMPER_WASTE_LIST_MENU_URL = "dumper-scanned-waste";
    public static DUMPER_PACKAGE_DEF_MENU_URL = "dumper-package-def";
    public static DUMPER_HANDOVER_MENU_URL = "dumper-handover";

    public static LOAD_MENU_PARENT_SEGMENT = "/load";
    public static UNLOAD_MENU_PARENT_SEGMENT = "/unload";

    public static MOBILE_MENU_IDS = "homeMenu|loadMenu|dashboardMenu|pickListMenu|packageScanMenu|tripScanMenu|packageDefMenu|handoverMenu|unloadMenu|unloadDashboardMenu|handoverByDriverMenu|tripCompletionMenu|tripInfoScanByProcessorMenu|verificationMenu|weightDeclarationMenu|wasteReceiveMenu|";

    public static AGREEMENT_OPERATION_TITLE_ENG = "operationTitleEng";
    public static AGREEMENT_OPERATION_TITLE_JPN = "operationTitleJpn";

    public static USER_TYPE_ADMIN = 'Admin';
    public static USER_TYPE_VISITOR = 'Visitor';

    public static COMPANY_CATEGORY_LIST: any = [
        {
            "id": "1",
            "eng": "Dumper",
            "jpn": "Dumper"
        },
        {
            "id": "3",
            "eng": "Transporter",
            "jpn": "Transporter"
        },
        {
            "id": "2",
            "eng": "Processor",
            "jpn": "Processor"
        }
    ];

    public static APPROVAL_REQUIRED_STATUS_OF_AGREEMENT: string[] = ["statusWaitingForAproval", "statusWaitingForAmmendmentApprove", "statusCancelationReadyForApprove", "statusSuspensionReadyForApprove", "statusReviveReadyForApprove"];

    public static AGREEMENT_STATUS_NEW = 'statusNewAgreement';
    public static AGREEMENT_STATUS_IN_USE = 'statusAgreementInUse';

    public static COMPANY_CATEGORY_TITLE_ENG = "eng";
    public static COMPANY_CATEGORY_TITLE_JPN = "jpn";

    public static COMPANY_CATEGORY_NAME: any = {
        "Dumper": {
            "eng": "Dumper",
            "jpn": "Dumper"
        },
        "Transporter": {
            "eng": "Transporter",
            "jpn": "Transporter"
        },
        "Processor": {
            "eng": "Processor",
            "jpn": "Processor"
        },
        "1": {
            "eng": "Dumper",
            "jpn": "Dumper"
        },
        "3": {
            "eng": "Transporter",
            "jpn": "Transporter"
        },
        "2": {
            "eng": "Processor",
            "jpn": "Processor"
        }
    }


    public static PROCESS_TITLE_KEY_ENG = 'processTitleEng';
    public static PROCESS_TITLE_KEY_JPN = 'processTitleJpn';

    public static ACTION_TITLE_KEY_ENG = 'actionTitleEng';
    public static ACTION_TITLE_KEY_JPN = 'actionTitleJpn';

    public static STATUS_TITLE_KEY_ENG = 'statusTitleEng';
    public static STATUS_TITLE_KEY_JPN = 'statusTitleJpn';

    public static AGREEMENT_PROCESS_ACCESS_NONE = "none";
    public static AGREEMENT_PROCESS_ACCESS_VIEW = "view";
    public static AGREEMENT_PROCESS_ACCESS_EDIT = "edit";

    public static USER_EMAIL_FOR_LANGUAGE_UPDATE = [
        'yallohate@gmail.com',
        'upalism@gmail.com',
        'mokid.mangrovesystemsbd@gmail.com',
        'joy.mangrovesystemsbd@gmail.com',
        'rakib.mangrovesystemsbd@gmail.com',
        'asadul83.islam@gmail.com',
        'abdullah.kayesh@gmail.com',
        'dxrsysadmin@gmail.com',
        'mrraju.ice.iu@gmail.com'
    ];

    public static USE_SAVED_BANK_ACCOUNT = 'savedAccount';
    public static USE_OTHER_BANK_ACCOUNT = 'otherAccount';

    public static JAPANESE_CURRENCY_SIGN = '¥';

    public static MENU_CATEGORY_COMPANY_MANAGEMENT = 'menucat001';
    public static MENU_CATEGORY_COMPANY_OPERATIONS = 'menucat002';
    public static ADMIN = "Admin";
    public static USER_CATEGORY_DXR_ADMIN = "usercategory0001";
    public static USER_CATEGORY_COMPANY_ADMIN = "usercategory0002";
    public static USER_CATEGORY_COMPANY_USER = "usercategory0003";
    public static DUMPER_CATEGORY_VALUE_ID = "1";
    public static PROCESSOR_CATEGORY_VALUE_ID = "2";
    public static TRANSPOTER_CATEGORY_VALUE_ID = "3";
    public static MENU_TYPE_PRIMARY = "menutype0001";
    public static MENU_TYPE_SECONDARY = "menutype0002";

    public static MENU_TYPE_NAME_PRIMARY = "Primary Menu";
    public static MENU_TYPE_NAME_SECONDARY = "Secondary Menu";

    public static PASSWORD_NOT_MATCHED_FLAG = '0';
    public static PASSWORD_MATCHED_FLAG = '1';
    public static PASSWORD_LENGTH_NOT_MATCHED_FLAG = '2';
    public static PASSWORD_LENGTH_MATCHED_FLAG = '1';

    public static SELECTED_COMPANY_ID_KEY = 'companyId';

    public static COMPANYADDRESS = 'Company Address : ';
    public static BRANCHADDRESS = 'Branch';

    public static PAYMENT_MODE = ['Cash', 'Bank Transfer'];
    public static PAYMENT_MODE_CASH = 'Cash';
    public static PAYMENT_MODE_BANK_TRANSFER = 'Bank Transfer';

    public static GASOLINE_TYPE = ['Regular (petrol)', 'Diesel', 'High Octane', 'CNG', 'Electric'];
    public static GASOLINE_TYPE_PETROL = 'Regular (petrol)';
    public static GASOLINE_TYPE_DIESEL = 'Diesel';
    public static GASOLINE_TYPE_OCTANE = 'High Octane';
    public static GASOLINE_TYPE_CNG = 'CNG';
    public static GASOLINE_TYPE_ELECTRIC = 'Electric';

    public static CATEGORY_NAME_DUMPER = 'Dumper';
    public static CATEGORY_NAME_TRANSPORTER = 'Transporter';
    public static CATEGORY_NAME_PROCESSOR = 'Processor';

    public static SUBSCRIPTION_INITIAL_SUBMIT_STATUS = '00000';
    public static CACHE_DEFAULT_DATE = '00000000000000'
    public static URL_DIRECTION_GET = 'get';
    public static URL_DIRECTION_SAVE = 'save';

    public static CACHE_URLS = [
        {
            name: 'language-setup',
            urlRegex: /\/language-competency\/language/,
            direction: AppConstant.URL_DIRECTION_GET
        },
        {
            name: 'static-page',
            urlRegex: /\/system-overview\/getPage/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'faq',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_GET
        },
        {
            name: 'language-setup',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'static-page',
            urlRegex: /\d_[a-zA-Z]+_\/savePage/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'faq',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_SAVE
        }
    ]

    public static CACHE_SAVE_URLS = [

    ]

    public static FOOTER_ROUTES = {
        COMPANY_USING_IT: '/visitor/system-overview/3',
        TERMS_OF_USE: '/visitor/terms-of-use',
        PRIVACY_POLICY: '/visitor/privacyPolicy'
    }

    public static USER_ID_OR_PASSWORD_NOT_MATCH_FLAG = "0";
    public static ONE_TIME_ACCESS_FLAG_TRUE = "1";
    public static ONE_TIME_ACCESS_FLAG_FALSE = "0";

    public static CONTROL_NAME_ENGLISH = 'controlNameEng';
    public static CONTROL_NAME_JAPANESE = 'controlNameJpn';
    public static INAVALID_MESSAGE_KEY_ENGLISH = 'invalidMsgEng';
    public static INAVALID_MESSAGE_KEY_JAPANESE = 'invalidMsgJpn';
    public static SAMPLE_VALUE_KEY_ENGLISH = 'sampleValueEng';
    public static SAMPLE_VALUE_KEY_JAPANESE = 'sampleValueJpn';
    public static SNACKBAR_TIME_DURATION = 2 * 1000;
    public static COMPANY_CATEGORY = ['Dumper', 'Transporter', 'Processor'];
    public static AUTH_ID_KEY = "auth-id";
    public static AUTH_PASS_KEY = "auth-pass"
    public static DXR_AUTH_ID = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqWV9jSRh/Rm9MYMdnCfneNWIS8qB04vGtXlWqbEzvnlJkeTd908Nz/u0ZAAqWusLnrfO5ndp32QmyrbnM9TPrw2Dn+BeeXWVb2v2VM7hEJ35H+UMEJvTZNuE/udg9pIsc+u465xvUXbMbPe3/1jGQaXpTsRDoShjLPDEIYvfsXOxYTW2ZZ3P7mKQBJcEthcbcwWjbm2JnD4sRBZo6CY+5l8pCXrtZoYmRmcZO0E9YiDDvhfRbLfwnsuuSsAc5/nSirBzS0hf9DzOBRCZQfBZauZlhosQm/uFToEKs2NkwAVuhC/AZqPJcmt/8vo6VNZSF4uQ1rstqkKWcIGWgw8iXQIDAQAB";
    public static HTTP_GET = 'GET';
    public static HTTP_POST = 'POST';
    public static HTTP_DELETE = 'DELETE';
    public static UI_MENU_LIST = 'menus';
    public static ENGLISH_MENU_TITLE = 'menuTitleEng';
    public static JAPANESE_MENU_TITLE = 'menuTitleJpn';
    public static BASE_URL: string = 'http://192.168.68.104:8000/web';
    public static MY_BASE_URL: string = 'http://192.168.68.104:8000/web';
    // public static BASE_URL: string = 'http://100.24.84.98:9000/web';
    // public static BASE_URL: string = 'http://172.31.95.49:9000/web';
    public static LANG_INDEX_KEY = 'langIndex';
    public static ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    public static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public static CONTACT_NO_REGEX = /^\+\d{10}$/;
    public static ZIP_CODE_REGEX = /^[0-9]{3}([- /]?[0-9]{4})?$/;
    public static LANG_INDEX_ENG = 'eng';
    public static LANG_INDEX_JPN = 'jpn';
    public static UI_LABEL_TEXT = 'labels';
    public static UI_MESSAGE_TEXT = 'messages';
    public static UI_NOTIFICATION_TEXT = 'notifications';
    public static ADD_OP = 'addItem';
    public static EDIT_OP = 'editItem';

    public static COMP = {
        APP_ROOT: 'appRoot',
        SYSTEM_ADMIN: 'system-admin',
        FAQ_VISITOR: 'faq-visitor',
        FAQ_CATEGORY: 'faq-category',
        FAQ_QUESTION_ANSWER: 'faq-question-answer',
        FAQ_ADMIN: 'faq-admin',
        ADD_FAQ_CATEGORY_ADMIN: 'faq-category-admin',
        SUBSCRIPTION_FORM: 'subscriptionForm',
        SUBSCRIPTION_SUCCESSFULL_POPUP: "subscription-success-popup",
        SUBSCRIPTION_LIST: "admin-subscription-list",
        SUBSCRIPTION_SUBMISSION_INFO: "admin-submission-info",
        SUBSCRIPTION_LIST_POPUP: "admin-subscription-list-popup",
        SUBSCRIPTION_CONFIRMATION: "admin-subscription-confirmation",
        ADD_FAQ_CATEGORY_FORM: 'add-faq-category-form',
        ADD_FAQ_QUESTION_ANSWER_ADMIN: 'faq-question-answer-admin',
        ADD_FAQ_QUESTION_ANSWER_FORM: 'faq-add-question-answer',
        USER_LOGIN: 'userLogin',
        INQUIRY_FORM: 'inquiry-form',
        INQUIRY_TABS: 'inquiry-tabs',
        INQUIRY_INFO_LIST: 'inquiry-info-list',
        RESPONSE_TAB: 'app-response',
        REPLY_POPUP: 'inquiry-reply',
        SYSTEM_OVERVIEW: 'admin-system-overview',
        CLIENT_LIST_TAB: 'clientListTab',
        HOW_TO_USE_IT: 'howToUseItTab',
        CASE_STUDY_TAB: 'caseStudyTab',
        BENEFITS_TAB: 'benefitsTab',
        CHANGE_PASSWORD: 'changePassword',
        SUBMITION_POPUP: 'submition-popup',
        TERMSANDCONDITION_POPUP: 'terms-condition-popup',
        VALIDATION_POPUP: 'validation-report-popup',
        INTORODUCTION_FLOW_TAB: 'introductionFlowTab',
        COMPANY_USING_IT_TAB: 'companyUsingItTab',
        COSTING_TAB: 'costingTab',
        TERMS_OF_USED: 'termsofUsed',
        PRIVACY_POLICY: 'privacyPolicy',
        COMPONENT_LIST: 'componentList',
        LANGUAGESETUP: 'languageSetupPopup',
        LANGUAGEMESSAGE: 'laguageJsonMessage',
        CREATE_DXR_ADMIN: 'create-dxr-admin',
        SET_DXR_ADMIN: 'set-dxr-admin',
        ROLE_DEF_ADMIN: 'role-definition-admin',
        ROLE_DEF_LIST: 'role-def-list',
        ROLE_ASSIGN: 'role-assign-popup',
        USER_MANAGEMENT_MENU: 'user-management-menu',
        USER_LIST_TAB: 'user-list',
        ADD_USER_POPUP: 'add-user-popup',
        VIEW_USER_INFO_POPUP: 'view-user-info-popup',
        DEFINE_ROLE_TAB: 'define-role-tab',
        SET_ROLE_POPUP: 'set-role-popup',
        ROLE_TAB: 'role-tab',
        MENU_ACCESS_TAB: 'menu-Access-tab',

        WASTE_DEF_MENU: 'wasteDefMenu',
        WASTE_CATEGORY_TAB: 'wasteCategoryTab',
        WASTE_CATEGORY_FORM: 'wasteCategoryForm',
        WASTE_ITEM_TAB: 'wasteItemTab',
        WASTE_ITEM_FORM: 'wasteItemForm',
        COMPANY_SETTINGS_TABS: 'company-settings-tabs',
        COMPANY_INFO_TAB: 'company-info-tab',
        COMPANY_INFO_POPUP: 'company-info-popup',
        ACCOUNT_INFO_TAB: 'account-info-tab',
        ACCOUNT_INFO_POPUP: 'account-info-popup',
        BANK_AACOUNT_INFO_POPUP: 'bank-account-info-popup',
        BRANCH_INFO_TAB: 'branch-info-tab',
        BRANCH_INFO_ADD_POPUP: 'branch-info-add-popup',
        BRANCH_INFO_VIEW_POPUP: 'branch-info-view-popup',
        VEHICLE_INFO_TAB: 'vehicle-info-tab',
        VEHICLE_INFO_ADD_POPUP: 'vehicle-info-add-popup',
        VEHICLE_INFO_VIEW_POPUP: 'vehicle-info-view-popup',
        BASE_PRICE_TAB: 'base-price-tab',
        ADD_WASTE_POPUP: 'add-waste-popup',
        PRICE_SELECTION_POPUP: 'price-selection-popup',
        DATE_TIME_DIRECTIVE: 'date-time-format',
        VIEW_LICENSE_POPUP: 'view-license-popup',
        COMPANY_MANAGEMENT_MENU: 'company-management-menu',
        SCALE_SETTING_TAB: 'scale-setting-tab',
        SCALE_SETTING_POPUP: 'scale-setting-popup',
        AGREEMENT_LIST_TAB: 'agreement-list-tab',
        AGREEMENT_TAB: 'agreement-tab',
        BUSINESS_PARTNER_TABS: 'business-partner-tabs',
        PARTNER_DETAILS_POPUP: 'partner-details-popup',
        PARTNER_LIST_TAB: 'partner-list-tab',
        SELECT_AGREEMENT_PARTNER_POPUP: 'select-agreement-partner-popup',
        SELECT_BANK_POPUP: 'select-bank-popup',
        SELECT_PERSON_IN_CHARGE_POPUP: 'select-person-inCharge-popup',
        SELECT_WASTE_POPUP: 'select-waste-popup',
        WASTE_REQUEST_FORM: 'waste-request-form',
        REQUEST_SUBMIT_POPUP: 'request-submit-popup',
        WASTE_REQUEST_TABS: 'waste-request-tabs',
        WASTE_REQUEST_LIST: 'waste-request-list-tab',
        REQUEST_RESPONSE: 'request-response-tab',
        REQUEST_REPLY_POPUP: 'request-reply-popup',
        CREATE_WASTE_TAB: 'create-waste-tab',
        SWITCH_COMPANY: 'switch-company-context',
        CATEGORY_FORM: 'categoryForm',
        CATEGORY_TAB: 'categoryTab',
        AGREEMENT_ACTION_CONFIRM_POPUP: 'agreement-action-confirm-popup',
        FAQ_VISITOR_VIEW: 'faqVisitorview',
        AGREEMENT_LIST_TAB_COMPONENT: 'AgreementListTabComponent',
        CREATE_NEW_PROJECT_TAB_COMPONENT: 'CreateNewProjectTabComponent',
        INITIATE_PROJECT_MENU_COMPONEN: 'InitiateProjectMenuComponen',
        PICK_SCHEDULE_TAB_COMPONENT: 'PickScheduleTabComponent',
        PROCEES_SCHEDULE_TAB_COMPONENT: 'ProceesScheduleTabComponent',
        PROJECT_LIST_DASH_BOARD_TAB_COMPONENT: 'ProjectListDashBoardTabComponent',
        SELECT_AGREEMENT_POPUP_COMPONENT: 'SelectAgreementPopupComponent',
        WASTE_PICK_TAB_COMPONENT: 'WastePickTabComponent',
        INQUIRY_VISITOR_TABS: 'inquiryVisitorTabs',
        INQUIRY_DISCUSSION_TAB: 'inquiryDiscussionTab',
        DISCUSSION_THREAD_POPUP: 'discussionThreadPopup',

        LOAD_DRIVER_DASHBOARD: 'load_driver_dashboard',
        LOAD_OP_TABS: "load_op_tabs",
        LOAD_HANDOVER: 'load_handover',
        LOAD_HANDOVER_CODE: "LOAD_HANDOVER_CODE",
        LOAD_PACKAGE_DEF: 'load_package_def',
        LOAD_PACKAGE_SCAN: "LOAD_PACKAGE_SCAN",
        LOAD_PICK_CODE: "load_pick_code",
        LOAD_PICK_LIST: "LOAD_PICK_LIST",
        LOAD_TRIP_SCAN: "load_trip_scan",
        LOAD_WASTE_LIST: "load_waste_list",

        UNLOAD_HANDOVER: "unload_handover",
        UNLOAD_PROCESSOR_RECEIVE: "unload_processor_receive",
        UNLOAD_TRIP_COMPLETION: "unload_trip_completion",
        UNLOAD_TRIP_COMPLETION_CODE: "unload_trip_completion_code",
        UNLOAD_DRIVER_DASHBOARD: "unload_driver_dashboard",
        UNLOAD_OP_TABS: "unload_op_tabs",
        UNLOAD_TRIP_SCAN: "unload_trip_scan",
        UNLOAD_VERIFICATION: "unload_verification",
        UNLOAD_WEIGHT_DECLARE: "UNLOAD_WEIGHT_DECLARE",

        COMPANY_NAME_HEADER_COMP: "company_name_header_comp"

    };
    public static Tabs = [
        {
            tabName: 'Case study',
            staticPageId: 'staticcontent0001'
        },
        {
            tabName: 'How to use it',
            staticPageId: 'staticcontent0002'
        },
        {
            tabName: 'Introduction Flow',
            staticPageId: 'staticcontent0003'
        },
        {
            tabName: 'Company Using it',
            staticPageId: 'staticcontent0004'
        },
        {
            tabName: 'Costing',
            staticPageId: 'staticcontent0005'
        },
        {
            tabName: 'Terms of use',
            staticPageId: 'staticcontent0006'
        },
        {
            tabName: 'Privacy Policy',
            staticPageId: 'staticcontent0007'
        },
    ];

    public static MENU_ID = {
        LOAD_MENU_ID: "loadMenu",
        UNLOAD_MENU_ID: "unloadMenu"
    };

}