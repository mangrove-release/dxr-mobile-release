import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/config/app-constant';
import { UserIdentification } from 'src/app/models/backend-update/user-login';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

    constructor(public modalController: ModalController, private userLoginService: UserLoginService, private appComponent: AppComponent, private router: Router, private utilService: UtilService) { }

    uiLabels: any = {
        headerLabel: "Login",
        userId: "User Id",
        password: "Password",
        loginButton: "Login",
        forgetPassButton: "Forget Password"
    }

    userIdentification: UserIdentification = {
        userId: '',
        userAuth: '',
        oneTimeAccessFlag: ''
    }
    userIdOrPasswordMatchFlag: string = '';

    ngOnInit() { }



    login() {

        if (this.userIdentification && this.userIdentification.userId && this.userIdentification.userAuth) {
            var encryptedPass = this.utilService.encrypt(this.userIdentification.userAuth);
            if (encryptedPass && encryptedPass.length > 0) {

                var userIdentification = Object.assign({}, this.userIdentification);
                userIdentification.userAuth = encryptedPass;

                this.userLoginService.login(userIdentification).subscribe(data => {

                    if (data) {
                        if (data == AppConstant.ONE_TIME_ACCESS_FLAG_TRUE) {
                            this.redirectToFirstLogin();

                        } else {
                            this.userLoginService.setUserLoginCookie(userIdentification.userId, userIdentification.userAuth, data[0].companyId);

                            this.appComponent.prepareUserAccessAndMenu(data);

                            this.resetForm();
                        }

                    } else if (!data || data == '') {
                        this.userIdOrPasswordMatchFlag = AppConstant.USER_ID_OR_PASSWORD_NOT_MATCH_FLAG;
                    }
                });
            }

        }
    }



    redirectToFirstLogin() {
        this.router.navigate(['/visitor/first-login/' + this.userIdentification.userId]);
    }

    async forgetPassOp() {

        const modal = await this.modalController.create({
            component: ChangePasswordComponent,
            componentProps: {
                userId: this.userIdentification.userId,
                fromProfile: false
            }
        });
        return await modal.present();

    }

    resetForm() {
        this.userIdentification = {
            userId: '',
            userAuth: '',
            oneTimeAccessFlag: ''
        }
    }

    redirectToHome() {
        this.router.navigate(['/']);
    }

}
