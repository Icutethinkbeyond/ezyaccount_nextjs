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
    Typography,
    CircularProgress,
    TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    Restore,
    DeleteForever,
    ArrowBack,
    Search,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";


const TrashTable: React.FC = () => {
    const router = useRouter();
    const [rows, setRows] = useState<any[]>([]);
    const [filteredRows, setFilteredRows] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const fetchDeletedQuotations = async () => {
        setLoading(true);
        try {
            const result = await fetch('/api/income/quotation?trash=true');
            const data = await result.json();

            if (Array.isArray(data)) {
                const mappedData = data.map((item: any) => ({
                    ...item,
                    keyId: item.documentIdNo,
                    id: item.documentIdNo,
                }));
                setRows(mappedData);
                setFilteredRows(mappedData);
            } else {
                console.error("Data received is not an array:", data);
                setRows([]);
            }
        } catch (error) {
            console.error("Failed to fetch deleted quotations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedQuotations();
    }, []);

    // Real-time search with debounce - รอ 2 วินาที หลังหยุดพิมพ์แล้วค่อยค้นหา
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRows(rows);
            return;
        }

        // Debounce: รอ 2 วินาที หลังจากหยุดพิมพ์แล้วค่อยค้นหา
        const timeoutId = setTimeout(() => {
            const query = searchQuery.toLowerCase().trim();
            const filtered = rows.filter((row: any) => {
                const documentIdNo = row.documentIdNo?.toLowerCase() || "";
                const contactorName = row.contactor?.contactorName?.toLowerCase() || "";
                const companyName = row.customerCompany?.companyName?.toLowerCase() || "";
                const grandTotal = row.grandTotal?.toString() || "";

                return (
                    documentIdNo.includes(query) ||
                    contactorName.includes(query) ||
                    companyName.includes(query) ||
                    grandTotal.includes(query)
                );
            });

            setFilteredRows(filtered);
        }, 1000);

        // Cleanup function: ยกเลิก timeout เก่าถ้ามีการพิมพ์ใหม่
        return () => clearTimeout(timeoutId);
    }, [searchQuery, rows]);

    const handleRestore = async (documentId: string) => {
        try {
            const response = await fetch(`/api/income/quotation/${documentId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                fetchDeletedQuotations();
            } else {
                console.error("Failed to restore quotation");
            }
        } catch (error) {
            console.error("Error restoring quotation:", error);
        }
    };

    const handlePermanentDelete = async (documentId: string) => {
        try {
            const response = await fetch(`/api/income/quotation/${documentId}?permanent=true`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchDeletedQuotations();
            } else {
                console.error("Failed to permanently delete quotation");
            }
        } catch (error) {
            console.error("Error permanently deleting quotation:", error);
        }
    };

    const columns: GridColDef[] = [
        {
            field: "keyId",
            headerName: "เลขที่เอกสาร",
            width: 200,
            valueGetter: (value, row) => row.documentIdNo,
        },
        {
            field: "deletedAt",
            headerName: "วันที่ลบ",
            width: 150,
            valueGetter: (value, row) => {
                if (!row.deletedAt) return "-";
                return new Date(row.deletedAt).toLocaleDateString("th-TH");
            },
        },
        {
            field: "contactorName",
            headerName: "ชื่อลูกค้า",
            width: 250,
            valueGetter: (value, row) => row.contactor?.contactorName || "-",
        },
        {
            field: "grandTotal",
            headerName: "ยอดรวมสุทธิ",
            width: 200,
            valueGetter: (value, row) => row.grandTotal?.toLocaleString(),
        },
        {
            field: "Actions",
            headerName: "",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        color="success"
                        title="กู้คืนรายการ"
                        onClick={() => handleRestore(params.row.documentId)}
                    >
                        <Restore />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="error"
                        title="ลบถาวร"
                        onClick={() => handlePermanentDelete(params.row.documentId)}
                    >
                        <DeleteForever />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => router.back()}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h3">ถังขยะ (ใบเสนอราคา)</Typography>
                </Box>
            </Box>

            <Box mb={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="ค้นหาด้วย เลขที่เอกสาร, ชื่อลูกค้า, ชื่อบริษัท หรือ ยอดเงิน..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Search sx={{ color: "action.active", mr: 1 }} />
                        ),
                    }}
                />
            </Box>

            <Box p={3} border="1px solid #ccc" borderRadius="8px">
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row.keyId}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    loading={loading}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                        toolbar: CustomToolbar,
                    }}
                />
            </Box>
        </Box>
    );
};

export default TrashTable;
