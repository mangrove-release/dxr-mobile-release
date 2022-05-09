import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DumperPageRoutingModule } from './dumper-routing.module';

import { DumperPage } from './dumper.page';
import { DumperHandoverOpTabsComponent } from './dumper-handover-op-tabs/dumper-handover-op-tabs.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DumperPageRoutingModule,
        CommonDirectivesModule
    ],
    declarations: [
        DumperPage,
        DumperHandoverOpTabsComponent
    ],
    exports: [
        DumperPage,
        DumperHandoverOpTabsComponent
    ],
    entryComponents: [DumperHandoverOpTabsComponent]
})
export class DumperPageModule { }
