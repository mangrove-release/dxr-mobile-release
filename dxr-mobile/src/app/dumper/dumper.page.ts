import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dumper',
    templateUrl: './dumper.page.html',
    styleUrls: ['./dumper.page.scss'],
})
export class DumperPage implements OnInit {

    constructor() { }

    componentCode: string = AppConstant.COMP.ADD_FAQ_CATEGORY_ADMIN;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

}
