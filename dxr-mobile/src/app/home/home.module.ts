import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AppleInstallPopupComponent } from './apple-install-popup/apple-install-popup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ExploreContainerComponentModule
    ],
    declarations: [
        HomePage,
        AppleInstallPopupComponent
    ],
    exports: [
        HomePage,
        AppleInstallPopupComponent
    ],
    entryComponents: [HomePage]
})
export class HomePageModule { }
