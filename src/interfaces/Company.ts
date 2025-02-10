

// CompanyProfile
export interface CompanyProfile {
    companyId: String;
    companyName: String; 
    companyAddress: String; 
    companyTaxId: String; 
    companyPhoneNumber: String; 
    companyEmail: String; 
    companyWebsite: String; 
    companyBusinessType: String; 
}

// Customer
export interface Customer {
    customerId: String;  
    customerEmail: String; 
    customerTaxId: String; 
  }

export const initialCompany: CompanyProfile = {
    companyId: '',
    companyName: '',
    companyAddress: '',
    companyTaxId: '',
    companyPhoneNumber: '', 
    companyEmail: '',
    companyWebsite: '', 
    companyBusinessType: '', 
};