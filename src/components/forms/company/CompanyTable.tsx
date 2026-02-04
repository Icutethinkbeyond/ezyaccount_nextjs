"use client";

import React, { useCallback } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { Add, EditCalendar, Delete, Visibility } from "@mui/icons-material";
import { GenericDataTable } from "@/components/shared/GenericDataTable";
import { useDataTable } from "@/hooks/useDataTable";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { CompanyProfile } from "@/interfaces/Company";

interface CompanyTableRow extends CompanyProfile {
    id: string;
}

const CompanyTable = () => {
    const router = useRouter();

    // Data mapping function
    const mapCompanyData = useCallback((item: CompanyProfile): CompanyTableRow => ({
        ...item,
        id: item.companyId,
    }), []);

    // Use data table hook
    const {
        rows,
        loading,
        paginationModel,
        setPaginationModel,
        refresh,
    } = useDataTable<CompanyProfile, CompanyTableRow>({
        apiUrl: "/api/companies",
        mapData: mapCompanyData,
    });

    // Use debounce search hook
    const { searchQuery, setSearchQuery, filteredRows } = useDebounceSearch({
        rows,
        searchFields: ["companyName", "companyTaxId", "companyPhoneNumber", "companyEmail", "companyBusinessType"],
        debounceMs: 500,
    });

    const handleDelete = async (id: string) => {
        if (!confirm("คุณต้องการลบข้อมูลบริษัทนี้ใช่หรือไม่?")) {
            return;
        }

        try {
            const res = await fetch(`/api/companies/${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("ลบข้อมูลสำเร็จ");
                refresh();
            } else {
                alert("ลบข้อมูลไม่สำเร็จ");
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        }
    };

    const columns: GridColDef[] = [
        { field: "companyName", headerName: "ชื่อบริษัท", flex: 1, minWidth: 200 },
        { field: "companyTaxId", headerName: "เลขผู้เสียภาษี", width: 150 },
        { field: "companyPhoneNumber", headerName: "เบอร์โทรศัพท์", width: 150 },
        { field: "companyEmail", headerName: "อีเมล", width: 200 },
        {
            field: "actions",
            headerName: "",
            width: 120,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
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
                            sx={{ color: "#d33" }}
                            onClick={() => handleDelete(params.row.companyId)}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const headerActions = (
        <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push("/company/new-company")}
            sx={{
                backgroundColor: "#33CC99",
                color: "#fff",
                "&:hover": { backgroundColor: "#009933" },
                textTransform: "none",
            }}
        >
            เพิ่มบริษัท
        </Button>
    );

    return (
        <GenericDataTable
            title="ข้อมูลบริษัททั้งหมด"
            rows={filteredRows}
            columns={columns}
            loading={loading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            paginationModel={paginationModel}
            onPaginationChange={setPaginationModel}
            headerActions={headerActions}
            pageSizeOptions={[5, 10]}
        />
    );
};

export default CompanyTable;
