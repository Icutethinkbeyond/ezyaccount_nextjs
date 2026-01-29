"use client";

import React, { useState, useEffect } from "react";
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    ArrowBack,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import SearchBox from "@/components/shared/SearchBox";
import { TrashActionButtons } from "@/components/quotation/ActionButtons";
import {
    documentIdColumn,
    deletedDateColumn,
    customerNameColumn,
    grandTotalColumn
} from "@/components/quotation/TableColumns";
import { IQuotation, IQuotationTableRow, TrashTableProps } from "@/contexts/QuotationContext";

const TrashTable: React.FC<TrashTableProps> = () => {
    const router = useRouter();
    const [rows, setRows] = useState<IQuotationTableRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<IQuotationTableRow[]>([]);
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
                const mappedData: IQuotationTableRow[] = data.map((item: IQuotation) => ({
                    ...item,
                    keyId: item.documentIdNo,
                    id: item.documentIdNo,
                }));
                setRows(mappedData);
                setFilteredRows(mappedData);
            } else {
                console.error("Data received is not an array:", data);
                setRows([]);
                setFilteredRows([]);
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
            const filtered = rows.filter((row: IQuotationTableRow) => {
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
        documentIdColumn,
        deletedDateColumn,
        customerNameColumn,
        grandTotalColumn,
        {
            field: "Actions",
            headerName: "",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <TrashActionButtons
                    documentId={params.row.documentId}
                    onRestore={handleRestore}
                    onPermanentDelete={handlePermanentDelete}
                />
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
                <SearchBox
                    value={searchQuery}
                    onChange={setSearchQuery}
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
