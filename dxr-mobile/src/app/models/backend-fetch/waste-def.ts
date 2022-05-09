// export interface WasteCategory {
//     wastecategoryId: string;
//     wasteCategoryTitle: string;
//     wasteCategoryCode: string;
//     remarks: string;
// }

export interface WasteItemDef {
    wasteId: string;
    wasteTitle: string;
    wasteCode: string | '';
    unitDef: string;
    wasteShape: string;
    wastePackage: string;
    remarks: string;
    wasteTypeId: string;
}

export interface TypeWiseWaste {
    wasteCategory: WasteTypeDef;
    wasteItems: WasteItemDef[];
}

export interface WasteRequest {
    requestWasteItemId: string;
    wasteId: string;
    wasteRequestId: string;
}

export interface CategoryDef {
    categoryId: string;
    categoryTitle: string;
    categoryCode: string;
    remarks: string;
}

export interface WasteTypeDef {
    categoryId: string;
    wasteTypeId: string;
    wasteTypeTitle: string;
    wasteTypeCode: string;
    remarks: string;
}