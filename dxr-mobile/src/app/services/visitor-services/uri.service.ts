import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrLanguageDef } from 'src/app/models/backend-fetch/dxr-language-def';
import { CacheUrlData } from 'src/app/models/backend-fetch/dxr-system';
import { environment } from 'src/environments/environment';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})

export class UriService {

    BASE_URL: string = environment.serverUrl;

    TEST_URL: string = 'http://192.168.68.111:8001/web';

    public DXR_ADMIN_MENU_CLICK = 0;

    cacheData: CacheUrlData[] = [];

    constructor(private cookieService: CookieService, private http: HttpClient, private utilService: UtilService) { }


    adjustDxrAdminMenuClick() {
        this.DXR_ADMIN_MENU_CLICK = (this.DXR_ADMIN_MENU_CLICK > 0) ? 0 : 1;
        return this.DXR_ADMIN_MENU_CLICK;
    }

    getCachUrlData(url: string) {
        var cachedData: any = '';
        if (this.cacheData) {
            this.cacheData.forEach(element => {
                if (element && element.url == url) {
                    cachedData = element.data;
                }
            })
        }

        return cachedData;
    }

    setCachUrlData(url: string, data: any) {
        var exist = false;
        if (this.cacheData) {
            this.cacheData.forEach(element => {
                if (element && element.url == url) {
                    element.data = data;
                    exist = true;
                }
            })
        }

        if (!exist) {
            this.cacheData.push({ url: url, data: data });
        }

    }


    public getHttpOptions() {
        const langIndex = this.cookieService.get(AppConstant.LANG_INDEX_KEY);
        return {
            headers: {
                langIndex: langIndex,
            },
        };
    }

    public getHttpOptionsForCacheUrl(url: string) {
        const langIndex = this.cookieService.get(AppConstant.LANG_INDEX_KEY);
        const cookieData: any = this.getCachUrlData(url);

        var cacheDate = AppConstant.CACHE_DEFAULT_DATE
        if (cookieData && cookieData.backendDate) {
            cacheDate = cookieData.backendDate
        }
        return {
            headers: {
                langIndex: langIndex,
                cookieDate: cacheDate
            },
        };
    }

    public getUrl(url: string): string {

        return (url.startsWith('/mob')) ? this.BASE_URL.concat(url) : this.BASE_URL.concat('/web').concat(url);
    }


    // getLanguageDef(uriService: any) {
    //     this.callBackend('/language-competency/language', AppConstant.HTTP_GET).subscribe(data => {
    //         if (data) {

    //         }
    //     });
    // }

    public callBackend(url: string, methodType: String, data?: any): Observable<any> {
        var response: any;
        // var baseUrl: string = this.getUrl();
        var fullUrl: string = this.getUrl(url);
        var options: any = this.getHttpOptions();

        var urlDirection = this.checkCacheUrl(url);

        if (urlDirection == AppConstant.URL_DIRECTION_GET) {


            var httpOptions: any = this.getHttpOptionsForCacheUrl(url);

            response = this.http.get<any>(fullUrl, httpOptions);

        } else if (urlDirection == AppConstant.URL_DIRECTION_SAVE) {

            var httpOptions: any = this.getHttpOptionsForCacheUrl(url);

            response = this.http.post<any>(fullUrl, data, httpOptions);

        } else if (methodType == AppConstant.HTTP_GET) {

            response = this.http.get<any>(fullUrl, options);

        } else if (methodType == AppConstant.HTTP_POST) {

            response = this.http.post<any>(fullUrl, data, options);

        } else if (methodType == AppConstant.HTTP_DELETE) {
            options.body = data;
            response = this.http.delete<any>(fullUrl, options);

        }

        return response;
    }

    callBackendWithCache(url: string, methodType: String, cacheUrl: string, data?: any, callBack?: any) {
        this.callBackend(url, methodType, data).subscribe(backendResponse => {
            if (backendResponse) {
                if (backendResponse.dxrInfoCache == '1') {
                    const cookieData: any = this.getCachUrlData(cacheUrl);
                    callBack(cookieData);
                } else {
                    this.setCachUrlData(cacheUrl, backendResponse);
                    callBack(backendResponse);
                }

            }

        });
    }

    async callBackend2(url: string, methodType: String, data?: any): Promise<any> {
        var response: any;
        // var baseUrl: string = this.getUrl();
        var fullUrl: string = this.getUrl(url);
        var options: any = this.getHttpOptions();

        var urlDirection = this.checkCacheUrl(url);

        if (urlDirection == AppConstant.URL_DIRECTION_GET) {

            const cookieData: any = this.getCachUrlData(url);

            var cacheDate = AppConstant.CACHE_DEFAULT_DATE
            if (cookieData && cookieData.backendDate) {
                cacheDate = cookieData.backendDate
            }
            var httpOptions: any = this.getHttpOptionsForCacheUrl(cacheDate);

            await this.http.get<any>(this.TEST_URL + url, httpOptions).subscribe((backendResponse: any) => {
                if (backendResponse) {
                    if (backendResponse.dxrInfoCache == '1') {
                        return response = cookieData;
                    } else {
                        this.setCachUrlData(url, backendResponse);
                        return response = backendResponse;

                    }
                }
            });

        } else if (urlDirection == AppConstant.URL_DIRECTION_SAVE) {
            // var backendResponse = this.http.post<any>(fullUrl, data, options);

        } else if (methodType == AppConstant.HTTP_GET) {

            response = this.http.get<any>(fullUrl, options);

        } else if (methodType == AppConstant.HTTP_POST) {

            response = this.http.post<any>(fullUrl, data, options);

        } else if (methodType == AppConstant.HTTP_DELETE) {
            options.body = data;
            response = this.http.delete<any>(fullUrl, options);

        }

        // if (response) {
        return response;
        // }
    }

    checkCacheUrl(url: string): String {
        var urlMatch = '';
        var cacheUrl = AppConstant.CACHE_URLS;

        if (cacheUrl && cacheUrl.length > 0) {
            for (let index = 0; index < cacheUrl.length; index++) {
                const element = cacheUrl[index];
                var match = this.utilService.checkRegex(element.urlRegex, url);
                if (match) {
                    urlMatch = element.direction;
                    break;
                }
            }
        }

        return urlMatch;
    }

    getZipCodeInformation(zipCode: string): Observable<any> {
        var url = '/util/zip';
        return this.callBackend(url, AppConstant.HTTP_POST, zipCode);
    }


}
