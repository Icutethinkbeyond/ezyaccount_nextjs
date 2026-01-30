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
    IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    Add,
    EditCalendar,
    Delete,
    Visibility,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import PageHeader from "@/components/shared/PageHeader";
import SearchBox from "@/components/shared/SearchBox";
import { CompanyProfile } from "@/interfaces/Company";


const CompanyTable = () => {
    const router = useRouter();
    const [rows, setRows] = useState<CompanyProfile[]>([]);
    const [filteredRows, setFilteredRows] = useState<CompanyProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const fetchCompanyData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/companies");
            if (res.ok) {
                const data = await res.json();
                const items = Array.isArray(data) ? data : [data].filter(Boolean);
                const rowsWithId = items.map((item: CompanyProfile) => ({
                    ...item,
                    id: item.companyId,
                }));
                setRows(rowsWithId);
                setFilteredRows(rowsWithId);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            alert("ไม่สามารถโหลดข้อมูลได้");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyData();
    }, []);

    // Debounced search logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRows(rows);
            return;
        }

        const timeoutId = setTimeout(() => {
            const query = searchQuery.toLowerCase().trim();
            const filtered = rows.filter((row: CompanyProfile) => {
                const name = row.companyName?.toLowerCase() || "";
                const taxId = row.companyTaxId?.toLowerCase() || "";
                const phone = row.companyPhoneNumber?.toLowerCase() || "";
                const email = row.companyEmail?.toLowerCase() || "";
                const type = row.companyBusinessType?.toLowerCase() || "";

                return (
                    name.includes(query) ||
                    taxId.includes(query) ||
                    phone.includes(query) ||
                    email.includes(query) ||
                    type.includes(query)
                );
            });
            setFilteredRows(filtered);
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery, rows]);

    const handleDelete = async (id: string) => {
        if (!confirm("คุณต้องการลบข้อมูลบริษัทนี้ใช่หรือไม่?")) {
            return;
        }

        try {
            const res = await fetch(`/api/companies/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("ลบข้อมูลสำเร็จ");
                fetchCompanyData();
            } else {
                alert("ลบข้อมูลไม่สำเร็จ");
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            alert("เกิดข้อผิดพลาดในการลบข้อมูล");
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
                    <Tooltip title="แก้ไข">
                        <IconButton
                            color="secondary"
                            onClick={() => router.push(`/company/edit-company/${params.row.companyId}`)}
                            size="small"
                        >
                            <EditCalendar />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ดูข้อมูล">
                        <IconButton
                            color="primary"
                            onClick={() => router.push(`/company/view-company/${params.row.companyId}`)}
                            size="small"
                        >
                            <Visibility />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ลบ">
                        <IconButton
                            size="small"
                            sx={{ color: '#d33' }}
                            onClick={() => handleDelete(params.row.companyId)}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
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

            <Box mt={2} mb={2}>
                <SearchBox
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="ค้นหาด้วย ชื่อบริษัท, เลขผู้เสียภาษี, เบอร์โทรศัพท์ หรือ อีเมล..."
                />
            </Box>

            <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2} mt={2}>
                <DataGrid
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    rows={filteredRows}
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
