import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, DriverTripPlan, PackageInfo, PickInfo, TripQrData } from 'src/app/models/backend-fetch/driver-op';
import { DriverDashboardService } from 'src/app/services/operation-services/driver-dashboard.service';
import { DriverTabsDataService } from 'src/app/services/operation-services/driver-tabs-data.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-package-def',
    templateUrl: './package-def.component.html',
    styleUrls: ['./package-def.component.scss'],
})
export class PackageDefComponent implements OnInit {

    constructor(public modalController: ModalController, private driverDashboardService: DriverDashboardService, private driverTabsDataService: DriverTabsDataService, private utilService: UtilService, private languageService: LanguageService, private router: Router) { }

    selectedPickForPackageDef: PickInfo;
    selectedTrip: DriverTripPlan;
    transporterCompanyInfo: CompanyInfo;
    scannedTripInfo: TripQrData;

    quantityRadioGroupModel: string = AppConstant.CALCULATED_QUANTITY;

    isQuantityAsLumpsum: boolean = false;

    allPackageDef: PackageInfo[] = [];

    newPackage: PackageInfo = {
        packageId: "",
        size: 0,
        numberOfPackage: 0,
        quantity: 5,
        pickId: "",
        disposeId: "",
        tripId: "",
        isLumpsum: "0"
    }

    uiLabels: any = {
        pageHeader: "Package Definition",
        wasteItemTitle: "Waste Item",
        pickQuantity: "Quantity",
        projectTitle: "Project Title",
        packageList: "Package List",
        packageSize: "Package Size",
        NumOfPackage: "Total Package",
        packageQuantity: "Waste Quantity",
        lumpsumQunatity: "Lumpsum Quantity",
        addPackage: "Add",
        handOverButton: "Handover",
    }

    viewContent = false;

    componentCode: string = AppConstant.COMP.LOAD_PACKAGE_DEF;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    ngOnInit() {

        // this.utilService.printLangDef(this.uiLabels,, this.componentCode);

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.newPackage.quantity = this.newPackage.size * this.newPackage.numberOfPackage;

        this.selectedPickForPackageDef = this.driverTabsDataService.getSelectedPickForPackageDef();

        this.selectedTrip = this.driverTabsDataService.getScannedTripPlan();

        this.transporterCompanyInfo = this.driverTabsDataService.getTransporterCompanyInfo();

        this.scannedTripInfo = this.driverTabsDataService.getScannedTripInfo();

        // this.allPackageDef = this.driverTabsDataService.getAllPackageDef();

        this.driverDashboardService.getPickPackageDefList(this.selectedPickForPackageDef.pickId).subscribe(response => {
            if (response) {
                this.allPackageDef = response;

                this.viewContent = true;
            }
        });
    }

    addPacakgeDef() {

        var newId = this.utilService.generateUniqueId();
        this.newPackage.packageId = newId;

        this.newPackage.pickId = this.selectedPickForPackageDef.pickId;
        this.newPackage.disposeId = this.selectedPickForPackageDef.disposalInfo.disposalInfoId;
        this.newPackage.tripId = this.selectedPickForPackageDef.tripId;

        if (this.quantityRadioGroupModel == AppConstant.LUMPSUM_QUNATITY) {
            this.newPackage.size = 0;
            this.newPackage.numberOfPackage = 0;
            this.newPackage.isLumpsum = AppConstant.TRUE_STATEMENT;
        } else {
            this.newPackage.quantity = this.newPackage.size * this.newPackage.numberOfPackage;
            this.newPackage.isLumpsum = AppConstant.FALSE_STATEMENT;
        }

        this.driverDashboardService.savePackageDef(this.newPackage).subscribe(response => {
            if (response) {
                this.addPackageDef(Object.assign({}, response));
                this.resetForm();
            }
        })
    }

    addPackageDef(packageDef: PackageInfo) {
        var index = this.allPackageDef.findIndex(item => item.packageId == packageDef.packageId);

        if (index >= 0) {
            this.allPackageDef[index] = packageDef;
        } else {
            this.allPackageDef.unshift(packageDef);
        }

    }

    resetForm() {
        this.newPackage = {
            packageId: "",
            size: 0,
            numberOfPackage: 0,
            quantity: 0,
            pickId: "",
            disposeId: "",
            tripId: "",
            isLumpsum: "0"
        }
    }

    handOverButton() {
        this.router.navigate([AppConstant.LOAD_MENU_PARENT_SEGMENT, { outlets: { driverOutlet: [AppConstant.DUMPER_HANDOVER_MENU_URL] } }]);
    }
}
