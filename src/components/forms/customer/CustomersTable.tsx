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
    Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    Add,
    EditCalendar,
    Delete,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import SearchBox from "@/components/shared/SearchBox";
import PageHeader from "@/components/shared/PageHeader";

interface Customer {
    contactorId: string;
    contactorName: string;
    contactorTel: string | null;
    contactorEmail: string | null;
    contactorAddress: string | null;
    createdAt: string;
}

interface CustomerTableRow extends Customer {
    id: string;
}

const CustomersTable: React.FC = () => {
    const router = useRouter();
    const [rows, setRows] = useState<CustomerTableRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<CustomerTableRow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const result = await fetch('/api/customer');
            const data = await result.json();

            if (Array.isArray(data)) {
                const mappedData: CustomerTableRow[] = data.map((item: Customer) => ({
                    ...item,
                    id: item.contactorId,
                }));
                setRows(mappedData);
                setFilteredRows(mappedData);
            } else {
                console.error("Data received is not an array:", data);
                setRows([]);
                setFilteredRows([]);
            }
        } catch (error) {
            console.error("Failed to fetch customers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddClick = () => {
        router.push(`/customer/new-customer`);
    };

    // Real-time search with debounce
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRows(rows);
            return;
        }

        const timeoutId = setTimeout(() => {
            const query = searchQuery.toLowerCase().trim();
            const filtered = rows.filter((row: CustomerTableRow) => {
                const contactorName = row.contactorName?.toLowerCase() || "";
                const contactorTel = row.contactorTel?.toLowerCase() || "";
                const contactorEmail = row.contactorEmail?.toLowerCase() || "";

                return (
                    contactorName.includes(query) ||
                    contactorTel.includes(query) ||
                    contactorEmail.includes(query)
                );
            });

            setFilteredRows(filtered);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, rows]);

    const handleDelete = async (contactorId: string) => {
        try {
            const response = await fetch(`/api/customer/${contactorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCustomers();
            } else {
                console.error("Failed to delete customer");
            }
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const columns: GridColDef[] = [
        {
            field: "contactorName",
            headerName: "ชื่อผู้ติดต่อ",
            flex: 1,
            minWidth: 180,
        },
        {
            field: "contactorTel",
            headerName: "เบอร์โทร",
            width: 130,
        },
        {
            field: "contactorEmail",
            headerName: "อีเมล์",
            width: 180,
        },
        {
            field: "contactorAddress",
            headerName: "ที่อยู่",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "Actions",
            headerName: "",
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="แก้ไข">
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => router.push(`/customer/edit-customer/${params.row.contactorId}`)}
                        >
                            <EditCalendar />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="ลบ">
                        <IconButton
                            size="small"
                            sx={{ color: '#d33' }}
                            onClick={() => handleDelete(params.row.contactorId)}
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
                title="ข้อมูลลูกค้าทั้งหมด"
                actions={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleAddClick}
                        sx={{
                            backgroundColor: "#33CC99",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#009933" },
                            textTransform: "none",
                        }}
                    >
                        เพิ่มลูกค้าใหม่
                    </Button>
                }
            />

            <Box mb={2}>
                <SearchBox
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </Box>

            <Box p={3} border="1px solid #ccc" borderRadius="8px" mb={2} mt={2}>
                <DataGrid
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    getRowId={(row) => row.id}
                    rows={filteredRows}
                    columns={columns}
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

export default CustomersTable;
