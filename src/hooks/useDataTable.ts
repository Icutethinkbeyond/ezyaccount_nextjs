"use client";

import { useState, useEffect, useCallback } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";

export interface UseDataTableOptions<TRaw, TRow> {
    apiUrl: string;
    mapData: (item: TRaw) => TRow;
    initialPageSize?: number;
}

export interface UseDataTableResult<TRow> {
    rows: TRow[];
    loading: boolean;
    paginationModel: GridPaginationModel;
    setPaginationModel: (model: GridPaginationModel) => void;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for managing DataTable state: fetching, pagination, and loading
 * @param options - Configuration options
 * @returns Table state and controls
 */
export function useDataTable<TRaw, TRow>({
    apiUrl,
    mapData,
    initialPageSize = 10,
}: UseDataTableOptions<TRaw, TRow>): UseDataTableResult<TRow> {
    const [rows, setRows] = useState<TRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: initialPageSize,
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (Array.isArray(data)) {
                const mappedData = data.map(mapData);
                setRows(mappedData);
            } else {
                console.error("Data received is not an array:", data);
                setRows([]);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setRows([]);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, mapData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        rows,
        loading,
        paginationModel,
        setPaginationModel,
        refresh: fetchData,
    };
}

export default useDataTable;
