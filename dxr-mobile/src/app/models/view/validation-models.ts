export interface ValidationMessage {
    message: String,
    sampleValue?: any
}

export interface ControlValidation {
    controlId: String,
    controlName: String;
    validations: Array<ValidationMessage>
}

export interface ValidationReport {
    componentCode: String,
    data: any,
    controls: Array<ControlValidation>,
    invalidCount: number
}