"use client";

import React, { useState, useEffect } from "react";
import { CompanyProfile } from "@/interfaces/Company";
import GenericInfoView, { FieldConfig, ViewStatus } from "@/components/shared/GenericInfoView";

interface CompanyViewProps {
    companyId: string;
}

export default function CompanyView({ companyId }: CompanyViewProps) {
    const [status, setStatus] = useState<ViewStatus>('loading');
    const [data, setData] = useState<CompanyProfile | null>(null);

    useEffect(() => {
        if (companyId) {
            fetchCompanyData(companyId);
        }
    }, [companyId]);

    const fetchCompanyData = async (id: string) => {
        try {
            setStatus('loading');
            const res = await fetch(`/api/companies/${id}`);
            if (res.ok) {
                const result: CompanyProfile = await res.json();
                setData(result);
                setStatus('ready');
            } else {
                setStatus('notFound');
            }
        } catch (error) {
            console.error("Failed to fetch company data", error);
            setStatus('error');
        }
    };

    const fields: FieldConfig<CompanyProfile>[] = [
        { label: "ชื่อบริษัท", key: "companyName" },
        { label: "เบอร์โทรศัพท์", key: "companyPhoneNumber" },
        { label: "เลขผู้เสียภาษี", key: "companyTaxId" },
        {
            label: "วันที่จดทะเบียน",
            key: "companyRegistrationDate",
            format: (val) => val ? new Date(val).toLocaleDateString("th-TH") : "-"
        },
        { label: "อีเมล", key: "companyEmail" },
        { label: "เว็บไซต์", key: "companyWebsite" },
        { label: "ประเภทธุรกิจ", key: "companyBusinessType" },
        { label: "ที่อยู่", key: "companyAddress" },
    ];

    return (
        <GenericInfoView
            title="รายละเอียดบริษัท"
            backPath="/company"
            data={data}
            fields={fields}
            status={status}
            notFoundMessage="ไม่พบข้อมูลบริษัท"
            errorMessage="เกิดข้อผิดพลาดในการโหลดข้อมูล"
        />
    );
}

