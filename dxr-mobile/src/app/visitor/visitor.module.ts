import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorPageRoutingModule } from './visitor-routing.module';

import { VisitorPage } from './visitor.page';
import { UserLoginComponent } from './user-login/user-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SwitchContextComponent } from './switch-context/switch-context.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VisitorPageRoutingModule,
        CommonDirectivesModule
    ],
    declarations: [
        VisitorPage,
        UserLoginComponent,
        ChangePasswordComponent,
        SwitchContextComponent
    ],
    exports: [
        VisitorPage,
        UserLoginComponent,
        ChangePasswordComponent,
        SwitchContextComponent
    ],
    entryComponents: [
        VisitorPage
    ]
})
export class VisitorPageModule { }
