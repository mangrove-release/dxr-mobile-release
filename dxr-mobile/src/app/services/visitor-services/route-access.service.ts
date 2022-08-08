import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessService implements CanActivate {

    constructor(private languageService: LanguageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        var isActive = false;
        if (route.url && route.url.length > 0) {
            if (this.isRouteAccessActive(route.url[0].path)) {
                isActive = true;
            }
        } else {
            isActive = true;
        }


        return isActive;
    }

    isRouteAccessActive(url: String): boolean {
        url = '/' + url;
        console.log(url);
        var isActive = false;
        var menuList: any[] = this.languageService.getUserMenuItems();

        if (menuList) {
            for (let index = 0; index < menuList.length; index++) {
                if (menuList[index].menuUrl == url) {
                    isActive = true;
                    break;
                }
            };
        }
        return isActive;
    }

}
