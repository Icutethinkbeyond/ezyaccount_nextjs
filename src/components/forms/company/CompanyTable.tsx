"use client";

import React, { useState, useEffect } from "react";
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import {
    Box,
    Button,
    Chip,
    IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    Add,
    Edit,
    Delete,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import PageHeader from "@/components/shared/PageHeader";
import { useNotifyContext } from "@/contexts/NotifyContext";

const CompanyTable = () => {
    const router = useRouter();
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { setNotify } = useNotifyContext();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const showNotification = (message: string, color: "success" | "error") => {
        setNotify({
            open: true,
            message: message,
            color: color,
        });
    };

    const fetchCompanyData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/companies");
            if (res.ok) {
                const data = await res.json();
                const items = Array.isArray(data) ? data : [data].filter(Boolean);
                const rowsWithId = items.map((item: any) => ({
                    ...item,
                    id: item.companyId,
                }));
                setRows(rowsWithId);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            showNotification("ไม่สามารถโหลดข้อมูลได้", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("คุณต้องการลบข้อมูลบริษัทนี้ใช่หรือไม่?")) {
            return;
        }

        try {
            const res = await fetch(`/api/companies/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                showNotification("ลบข้อมูลสำเร็จ", "success");
                fetchCompanyData();
            } else {
                showNotification("ลบข้อมูลไม่สำเร็จ", "error");
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            showNotification("เกิดข้อผิดพลาดในการลบข้อมูล", "error");
        }
    };

    const columns: GridColDef[] = [
        { field: 'companyName', headerName: 'ชื่อบริษัท', flex: 1, minWidth: 200 },
        { field: 'companyTaxId', headerName: 'เลขผู้เสียภาษี', width: 150 },
        { field: 'companyPhoneNumber', headerName: 'เบอร์โทรศัพท์', width: 150 },
        { field: 'companyEmail', headerName: 'อีเมล', width: 200 },
        {
            field: 'actions',
            headerName: 'จัดการ',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        onClick={() => router.push(`/company/edit-company/${params.row.companyId}`)}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.companyId)}
                        size="small"
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <PageHeader
                title="ข้อมูลบริษัททั้งหมด"
                actions={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => router.push('/company/new-company')}
                        sx={{
                            backgroundColor: "#33CC99",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#009933" },
                            textTransform: "none",
                        }}
                    >
                        เพิ่มบริษัท
                    </Button>
                }
            />

            <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2} mt={2}>
                <DataGrid
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    onPaginationModelChange={setPaginationModel}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        toolbar: CustomToolbar,
                    }}
                    sx={{ border: 0 }}
                />
            </Box>
        </Box>
    );
};

export default CompanyTable;
