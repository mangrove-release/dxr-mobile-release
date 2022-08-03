import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { ChangeUserIdentification, UserIdentification } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    // @Input()
    // userId!: string;

    // @Input()
    // fromUserProfile: boolean | false;

    constructor(private modalController: ModalController, private navParams: NavParams, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {
        pageHeaderChangePass: "Change Password",
        pageHeaderForgetPass: "Forget Password",
        userId: "User Id",
        sendAccessCodeBtn: "Send Access Code",
        accessCode: "Access Code",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        passwordNotMatchLabel: "* Password Not Matched",
        cancelButton: "Cancel",
        changePassword: "Change Password"

    };
    userId: string = '';
    fromUserProfile: boolean = false;

    newIdentification: ChangeUserIdentification = {
        userId: '',
        accessCode: '',
        oneTimeAccessFlag: '',
        newAuth: ''
    }

    newPassword: string = '';
    confirmPassword: string = '';

    isSystemAdmin: boolean = this.utilService.languageEditMode();
    componentCode: string = AppConstant.COMP.CHANGE_PASSWORD;

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        if (this.navParams) {

            this.newIdentification.userId = this.navParams.data.userId;
            this.fromUserProfile = this.navParams.data.fromProfile;
        }

        if (!this.fromUserProfile) {
            this.fromUserProfile = false;
        }

    }

    sendAccessCode() {
        // this.newIdentification.oneTimeAccessFlag = '1';
        if (this.newIdentification.userId) {
            this.superAdminService.resendUserAccess(this.newIdentification.userId).subscribe((response: String) => {
                if (response && response == '1') {
                    alert('Please check mail for your user access information.');
                    this.newIdentification.oneTimeAccessFlag = '1';
                } else {
                    alert('Couldn\'t send Access Code. Please try again.');
                }
            });

        }

    }

    changePassword() {

        if (this.newIdentification && this.newIdentification.accessCode && this.newPassword == this.confirmPassword) {
            var encryptedPass = this.utilService.encrypt(this.confirmPassword);
            if (encryptedPass && encryptedPass.length > 0) {
                this.newIdentification.newAuth = encryptedPass;
                this.userLoginService.chnagePassword(this.newIdentification).subscribe((response: string) => {
                    if (response && response == '1') {
                        alert('Password change successfull. Please login using new password.');
                        window.location.assign('/visitor/login');
                    } else {
                        alert('Access Code dosn\'t match. Please check your Access Code.');
                    }
                });
            }
        }

    }

    passwordMatchFlag = '';

    checkPasswordSimilarity() {
        if (this.newPassword == this.confirmPassword) {
            this.passwordMatchFlag = '1';

        } else {
            this.passwordMatchFlag = '0';

        }
    }

    async closeModal() {

        await this.modalController.dismiss();
    }
}
