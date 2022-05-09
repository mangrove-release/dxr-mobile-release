export interface SubscriptionUpdateInfo {
    id: string;
    companyName: string;
    address: string;
    contactNo: string;
    subscriptionEmail: string;
    companyCategory: Array<string>;
    isHuman: boolean;
    isAgree: boolean;
    response: string;
    subscriberName: string;
    subscriberMail: string;
    zipCode: string,
    password: string;

}
export interface SubscriptionUpdateInfoForForm {
    id: string;
    companyName: string;
    address: string;
    contactNo: string;
    subscriptionEmail: string;
    companyCategory: Array<string>;
    isHuman: boolean;
    isAgree: boolean;
    response: string;
    subscriberName: string;
    subscriberMail: string;
    zipcode: string;
    newPassword: string;
    confirmPassword: string;

}

export interface Catagory {
    name: string;
    isCheck: boolean;
    label: any;
}