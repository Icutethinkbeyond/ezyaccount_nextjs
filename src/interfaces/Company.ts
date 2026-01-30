
// CompanyProfile
export interface CompanyProfile {
    companyId: string;
    companyName: string;
    companyAddress?: string | null;
    companyTaxId?: string | null;
    companyPhoneNumber?: string | null;
    companyEmail?: string | null;
    companyWebsite?: string | null;
    companyRegistrationDate?: string | Date | null;
    companyBusinessType?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// Customer (Keeping for compatibility if used elsewhere)
export interface Customer {
    customerId: string;
    customerEmail: string;
    customerTaxId: string;
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
    companyRegistrationDate: '',
};