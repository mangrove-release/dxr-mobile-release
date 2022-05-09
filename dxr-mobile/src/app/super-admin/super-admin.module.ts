import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperAdminPageRoutingModule } from './super-admin-routing.module';

import { SuperAdminPage } from './super-admin.page';
import { CompLanguageSetPopupComponent } from './comp-language-set-popup/comp-language-set-popup.component';
import { LanguageDefAddPopupComponent } from './language-def-add-popup/language-def-add-popup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SuperAdminPageRoutingModule

    ],
    declarations: [
        SuperAdminPage,
        CompLanguageSetPopupComponent,
        LanguageDefAddPopupComponent
    ],
    exports: [
        CompLanguageSetPopupComponent,
        LanguageDefAddPopupComponent
    ],
    entryComponents: [
        SuperAdminPage
    ]
})
export class SuperAdminPageModule { }
