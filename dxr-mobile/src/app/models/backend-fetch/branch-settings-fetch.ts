
export interface BranchInfoFetch {
    branchId: String,
    branchName: String,
    branchAddress: String,
    branchManagerName: String,
    frontendDate: string,
    backendDate: string,
    vehicleList: VehicleInfoFetch[],
    userList: UserInfoFetch[]
}
export interface VehicleInfoFetch {
    vehicleId: String,
    frontendDate: string,
    backendDate: string,
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
export interface UserInfoFetch {
    userId: String,
    name: String,
    address: String,
    email: String,
    contactNo: String,
    department: String,
    jobTitle: String,
    frontendDate: string,
    backendDate: string,
    isSelected: Boolean
}

export interface CompanyUserInfoFetch {
    userId: String,
    name: String,
    address: String,
    email: String,
    contactNo: String,
    department: String,
    jobTitle: String,
    licenseNo: String,
    Licensepdf: String,
    picture: String,
    dumperRole: String,
    transporterRole: String,
    processorRole: String,
    frontendDate: string,
    backendDate: string,
    isSelected: Boolean
}