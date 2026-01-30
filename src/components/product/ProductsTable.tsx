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
    Edit,
    Delete,
    Visibility,
} from "@mui/icons-material";
import { CustomNoRowsOverlay } from "@/components/shared/NoData";
import { CustomToolbar } from "@/components/shared/CustomToolbar";
import SearchBox from "@/components/shared/SearchBox";
import PageHeader from "@/components/shared/PageHeader";

interface ProductRow {
    id: string;
    keyId: string;
    productName: string;
    description: string;
    price: number;
    unit: string;
}

const ProductsTable: React.FC = () => {
    const router = useRouter();
    const [rows, setRows] = useState<ProductRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<ProductRow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/inventory/product");
            const data = await response.json();

            if (Array.isArray(data)) {
                const mappedData: ProductRow[] = data.map((product: any) => ({
                    id: product.productId,
                    keyId: product.productId,
                    productName: product.productName,
                    description: product.productDescription || "",
                    price: product.aboutProduct?.productPrice || 0,
                    unit: product.aboutProduct?.unitName || "ชิ้น",
                }));
                setRows(mappedData);
                setFilteredRows(mappedData);
            } else {
                console.error("Data received is not an array:", data);
                setRows([]);
                setFilteredRows([]);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddClick = () => {
        router.push("/product/new");
    };

    // Real-time search with debounce
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRows(rows);
            return;
        }

        const timeoutId = setTimeout(() => {
            const query = searchQuery.toLowerCase().trim();
            const filtered = rows.filter((row: ProductRow) => {
                const productName = row.productName?.toLowerCase() || "";
                const description = row.description?.toLowerCase() || "";

                return (
                    productName.includes(query) ||
                    description.includes(query)
                );
            });

            setFilteredRows(filtered);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, rows]);

    const handleDelete = async (productId: string) => {
        if (!confirm("ต้องการลบสินค้านี้ใช่หรือไม่?")) return;

        try {
            const response = await fetch(`/api/inventory/product/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("ลบสินค้าสำเร็จ");
                fetchProducts();
            } else {
                alert("ไม่สามารถลบสินค้าได้");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "productName",
            headerName: "ชื่อสินค้า",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "description",
            headerName: "รายละเอียด",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "price",
            headerName: "ราคา",
            width: 150,
            valueFormatter: (value) => {
                return `${Number(value).toLocaleString("th-TH")} บาท`;
            },
        },
        {
            field: "unit",
            headerName: "หน่วย",
            width: 120,
        },
        {
            field: "actions",
            headerName: "",
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="ดูข้อมูล">
                        <IconButton
                            size="small"
                            color="info"
                            onClick={() => router.push(`/product/view/${params.row.id}`)}
                        >
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="แก้ไข">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => router.push(`/product/edit/${params.row.id}`)}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="ลบ">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <PageHeader
                title="ข้อมูลสินค้าทั้งหมด"
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
                        เพิ่มสินค้าใหม่
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
                    getRowId={(row) => row.keyId}
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

export default ProductsTable;
