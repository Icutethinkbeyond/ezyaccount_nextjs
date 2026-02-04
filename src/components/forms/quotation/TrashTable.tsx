"use client";

import React, { useCallback } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { GenericDataTable } from "@/components/shared/GenericDataTable";
import { useDataTable } from "@/hooks/useDataTable";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { TrashActionButtons } from "@/components/quotation/ActionButtons";
import {
    documentIdColumn,
    deletedDateColumn,
    customerNameColumn,
    grandTotalColumn,
} from "@/components/quotation/TableColumns";
import { IQuotation, IQuotationTableRow, TrashTableProps } from "@/contexts/QuotationContext";

const TrashTable: React.FC<TrashTableProps> = () => {
    const router = useRouter();

    // Data mapping function
    const mapQuotationData = useCallback((item: IQuotation): IQuotationTableRow => ({
        ...item,
        keyId: item.documentIdNo,
        id: item.documentIdNo,
    }), []);

    // Use data table hook
    const {
        rows,
        loading,
        paginationModel,
        setPaginationModel,
        refresh,
    } = useDataTable<IQuotation, IQuotationTableRow>({
        apiUrl: "/api/income/quotation?trash=true",
        mapData: mapQuotationData,
    });

    // Use debounce search hook
    const { searchQuery, setSearchQuery, filteredRows } = useDebounceSearch({
        rows,
        searchFields: ["documentIdNo", "contactor.contactorName", "customerCompany.companyName", "grandTotal"],
        debounceMs: 1000,
    });

    const handleRestore = async (documentId: string) => {
        try {
            const response = await fetch(`/api/income/quotation/${documentId}`, {
                method: "PUT",
            });

            if (response.ok) {
                refresh();
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
                method: "DELETE",
            });

            if (response.ok) {
                refresh();
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
            renderCell: (params: GridRenderCellParams) => (
                <TrashActionButtons
                    documentId={params.row.documentId}
                    onRestore={handleRestore}
                    onPermanentDelete={handlePermanentDelete}
                />
            ),
        },
    ];

    const customHeader = (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={() => router.back()}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h3">ถังขยะ (ใบเสนอราคา)</Typography>
            </Box>
        </Box>
    );

    return (
        <GenericDataTable
            title=""
            rows={filteredRows}
            columns={columns}
            loading={loading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            paginationModel={paginationModel}
            onPaginationChange={setPaginationModel}
            getRowId={(row) => row.keyId}
            customHeader={customHeader}
        />
    );
};

export default TrashTable;
