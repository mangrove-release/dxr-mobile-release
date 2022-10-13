import { Injectable } from '@angular/core';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../visitor-services/uri.service';
import { MenifestoInfo, NotificationSetInfo } from 'src/app/models/backend-fetch/menifest';
import { WasteItemDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';

@Injectable({
    providedIn: 'root'
})
export class MenifestoService {

    constructor(private uriService: UriService) { }

    getAgreementById(agreementId: string): Observable<AgreementInfo> {
        var url = '/agreement/get-agreement-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementId);
    };

    getProject(projectId: string): Observable<ProjectInfoFetch> {
        var url = '/project-initiation/project-detail-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectId);
    };

    getAgreement(projectId: string, collectionId: string): Observable<AgreementInfo> {
        var url = '/mob/menifesto/get-agreement';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { projectId: projectId, collectionId: collectionId });
    };

    saveMenifesto(menifesto: MenifestoInfo): Observable<MenifestoInfo> {
        var url = '/mob/menifesto/save-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, menifesto);
    }

    getWasteItemDef(wasteItemId: string, callBack: any) {
        var url = '/waste-def/get-waste-item-def';
        this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteItemId).subscribe(response => {
            callBack(response);
        });
    }

    generateNotiForManifestoCreate(notificationSetInfo: NotificationSetInfo): Observable<any> {

        var url = '/menifesto/manifesto-notification';

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, notificationSetInfo);
    }
}
