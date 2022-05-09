import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { DateTimeService } from 'src/app/services/visitor-services/date-time.service';
import { UriService } from 'src/app/services/visitor-services/uri.service';

@Component({
    selector: 'app-date-time-input',
    templateUrl: './date-time-input.component.html',
    styleUrls: ['./date-time-input.component.css']
})
export class DateTimeInputComponent implements OnInit {

    @Input()
    modelObject: any;

    @Input()
    modelDateAttributeName: any;

    constructor(private languageService: LanguageService, private breakpointObserver: BreakpointObserver, private dateTimeService: DateTimeService, private uriService: UriService) { }

    langIndex: string = AppConstant.LANG_INDEX_ENG;
    placeholder: string = '';
    mask: string = '0000/00/00';

    uiLabels: any;

    url = '/util/check-date';
    validDate = "1";

    selectedLanguage = this.languageService.getSelectedLanguageIndex();

    //  = {
    //     placeholder: 'YY年MM月DD日',
    // }

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.DATE_TIME_DIRECTIVE, AppConstant.UI_LABEL_TEXT);
        this.langIndex = this.languageService.getSelectedLanguageIndex();
        if (this.langIndex == AppConstant.LANG_INDEX_JPN) {
            this.mask = '00/00/00';
        }
        // this.placeholder = this.dateTimeService.getPlaceholder(this.langIndex);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    checkDateValidity() {


        var date = this.modelObject[this.modelDateAttributeName];
        this.uriService.callBackend(this.url, AppConstant.HTTP_POST, date).subscribe(valid => {

            this.validDate = valid;

        });
    }

}
