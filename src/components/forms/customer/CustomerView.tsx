"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "@/interfaces/Customer";
import GenericInfoView, { FieldConfig, ViewStatus } from "@/components/shared/GenericInfoView";

interface CustomerViewProps {
    customerId: string;
}

export default function CustomerView({ customerId }: CustomerViewProps) {
    const [status, setStatus] = useState<ViewStatus>('loading');
    const [data, setData] = useState<Customer | null>(null);

    useEffect(() => {
        if (customerId) {
            fetchCustomerData(customerId);
        }
    }, [customerId]);

    const fetchCustomerData = async (id: string) => {
        try {
            setStatus('loading');
            const res = await fetch(`/api/customer/${id}`);
            if (res.ok) {
                const result: Customer = await res.json();
                setData(result);
                setStatus('ready');
            } else {
                setStatus('notFound');
            }
        } catch (error) {
            console.error("Failed to fetch customer data", error);
            setStatus('error');
        }
    };

    const fields: FieldConfig<Customer>[] = [
        { label: "ชื่อผู้ติดต่อ", key: "contactorName" },
        { label: "เบอร์โทรศัพท์", key: "contactorTel" },
        { label: "อีเมล", key: "contactorEmail" },
        { label: "ที่อยู่", key: "contactorAddress" },
    ];

    return (
        <GenericInfoView
            title="รายละเอียดลูกค้า"
            backPath="/customer"
            data={data}
            fields={fields}
            status={status}
            notFoundMessage="ไม่พบข้อมูลลูกค้า"
            errorMessage="เกิดข้อผิดพลาดในการโหลดข้อมูล"
        />
    );
}
