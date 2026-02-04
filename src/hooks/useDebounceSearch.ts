"use client";

import { useState, useEffect, useMemo } from "react";

/**
 * Get nested property from object using dot notation
 * e.g., getNestedValue(obj, 'contactor.contactorName')
 */
function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)?.toString()?.toLowerCase() || "";
}

export interface UseDebounceSearchOptions<T> {
    rows: T[];
    searchFields: string[];
    debounceMs?: number;
}

export interface UseDebounceSearchResult<T> {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredRows: T[];
}

/**
 * Custom hook for debounced search filtering
 * @param options - Configuration options
 * @returns Search state and filtered rows
 */
export function useDebounceSearch<T>({
    rows,
    searchFields,
    debounceMs = 500,
}: UseDebounceSearchOptions<T>): UseDebounceSearchResult<T> {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");

    // Debounce the search query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(searchQuery.toLowerCase().trim());
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, debounceMs]);

    // Filter rows based on debounced query
    const filteredRows = useMemo(() => {
        if (!debouncedQuery) {
            return rows;
        }

        return rows.filter((row) => {
            return searchFields.some((field) => {
                const value = getNestedValue(row, field);
                return value.includes(debouncedQuery);
            });
        });
    }, [rows, debouncedQuery, searchFields]);

    return {
        searchQuery,
        setSearchQuery,
        filteredRows,
    };
}

export default useDebounceSearch;
