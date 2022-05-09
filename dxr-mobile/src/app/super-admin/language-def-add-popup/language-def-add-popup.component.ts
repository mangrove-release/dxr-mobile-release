import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-language-def-add-popup',
    templateUrl: './language-def-add-popup.component.html',
    styleUrls: ['./language-def-add-popup.component.css']
})
export class LanguageDefAddPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, public dialogRef: MatDialogRef<LanguageDefAddPopupComponent>, @Inject(MAT_DIALOG_DATA) public title: string) { }



    ngOnInit(): void {
    }
    language: any = {
        key: "",
        eng: "",
        jpn: ""
    };
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
}
