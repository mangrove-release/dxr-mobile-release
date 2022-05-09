
export interface VehicleInfoUpdate {
    vehicleId: String,
    manufacturerName: String,
    vehicleType: String,
    modelName: String,
    vehicleRegNo: String,
    vehicleCapacity: String,
    vehicleWeight: String,
    gasolineType: String,
    inspectionDate: String,
    vehicleOwnerShip: Array<String>,
    remarks: String
}

export interface BranchUserInfoUpdate {
    userId: String,
    name: String,
    address: String,
    email: String,
    contactNo: String,
    department: String,
    jobTitle: String,
    isSelected: Boolean
}

