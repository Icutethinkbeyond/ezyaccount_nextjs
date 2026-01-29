import { GridColDef } from "@mui/x-data-grid";

/**
 * Reusable column definition for document number
 */
export const documentIdColumn: GridColDef = {
    field: "keyId",
    headerName: "เลขที่เอกสาร",
    width: 200,
    valueGetter: (value, row) => row.documentIdNo,
};

/**
 * Reusable column definition for creation date
 */
export const creationDateColumn: GridColDef = {
    field: "createDate",
    headerName: "วันที่ออกเอกสาร",
    width: 150,
    valueGetter: (value, row) => {
        if (!row.createdAt) return "-";
        return new Date(row.createdAt).toLocaleDateString("th-TH");
    },
};

/**
 * Reusable column definition for deleted date
 */
export const deletedDateColumn: GridColDef = {
    field: "deletedAt",
    headerName: "วันที่ลบ",
    width: 150,
    valueGetter: (value, row) => {
        if (!row.deletedAt) return "-";
        return new Date(row.deletedAt).toLocaleDateString("th-TH");
    },
};

/**
 * Reusable column definition for customer name
 */
export const customerNameColumn: GridColDef = {
    field: "contactorName",
    headerName: "ชื่อลูกค้า",
    width: 250,
    valueGetter: (value, row) => row.contactor?.contactorName || "-",
};

/**
 * Reusable column definition for grand total
 */
export const grandTotalColumn: GridColDef = {
    field: "repirePrice",
    headerName: "ยอดรวมสุทธิ",
    width: 200,
    valueGetter: (value, row) => row.grandTotal?.toLocaleString(),
};

/**
 * Reusable column definition for status (commented out by default)
 */
export const statusColumn: GridColDef = {
    field: "status",
    headerName: "สถานะ",
    width: 150,
    valueGetter: (value, row) => row.documentStatus,
};
