
export interface Customer {
    contactorId: string;
    contactorName: string;
    contactorEmail: string | null;
    contactorTel: string | null;
    contactorAddress: string | null;
    isStandalone?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export const initialCustomer: Customer = {
    contactorId: "",
    contactorName: "",
    contactorEmail: "",
    contactorTel: "",
    contactorAddress: "",
    isStandalone: false,
};
