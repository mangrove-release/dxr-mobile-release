import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule } from 'ngx-mask';
import { CommonDirectivesRoutingModule } from './common-directives-routing.module';
import { CommonDirectivesComponent } from './common-directives.component';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LangDefButtonComponent } from './lang-def-button/lang-def-button.component';
import { IonicModule } from '@ionic/angular';
import { CompanyNameHeaderComponent } from './company-name-header/company-name-header.component';

@NgModule({
    declarations: [
        CommonDirectivesComponent,
        DateTimeInputComponent,
        QrScannerComponent,
        LangDefButtonComponent,
        CompanyNameHeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZXingScannerModule,
        DragDropModule,
        CommonModule,
        CommonDirectivesRoutingModule,
        FormsModule,
        MatExpansionModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        ZXingScannerModule,
        FormsModule,
        MatExpansionModule,
        NgxMaskModule,
        DateTimeInputComponent,
        QrScannerComponent,
        LangDefButtonComponent,
        CompanyNameHeaderComponent

    ]
})
export class CommonDirectivesModule { }