"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Autocomplete, TextField, CircularProgress, Box, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import debounce from "lodash/debounce";

interface CustomerOption {
    contactorId: string;
    contactorName: string;
    contactorTel: string | null;
    contactorEmail: string | null;
    contactorAddress: string | null;
}

interface CustomerAutocompleteProps {
    onSelect: (customer: CustomerOption | null) => void;
    value?: CustomerOption | null;
}

const CustomerAutocomplete: React.FC<CustomerAutocompleteProps> = ({ onSelect, value }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<CustomerOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Fetch customers from API (only standalone contactors from customer page)
    const fetchCustomers = async (search: string = "") => {
        setLoading(true);
        try {
            const url = search
                ? `/api/customer?search=${encodeURIComponent(search)}`
                : '/api/customer';
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data)) {
                setOptions(data);
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const debouncedSearch = useCallback(
        debounce((searchValue: string) => {
            fetchCustomers(searchValue);
        }, 300),
        []
    );

    // Initial load
    useEffect(() => {
        if (open) {
            fetchCustomers();
        }
    }, [open]);

    // Handle input change for search
    const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
        if (newInputValue.length > 0) {
            debouncedSearch(newInputValue);
        } else if (open) {
            fetchCustomers();
        }
    };

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={value || null}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => {
                onSelect(newValue);
            }}
            isOptionEqualToValue={(option, value) =>
                option.contactorId === value.contactorId
            }
            getOptionLabel={(option) => option.contactorName || ""}
            options={options}
            loading={loading}
            noOptionsText="ไม่พบข้อมูลลูกค้า (กรุณาเพิ่มลูกค้าในหน้า ข้อมูลลูกค้า ก่อน)"
            loadingText="กำลังค้นหา..."
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.contactorId}>
                    <Box display="flex" alignItems="center" gap={1.5} width="100%">
                        <Person sx={{ color: "#33CC99", fontSize: 20 }} />
                        <Box flex={1}>
                            <Typography variant="body2" fontWeight={500}>
                                {option.contactorName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {option.contactorTel && `โทร: ${option.contactorTel}`}
                                {option.contactorEmail && ` | ${option.contactorEmail}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="🔍 ค้นหาลูกค้าที่บันทึกไว้"
                    placeholder="พิมพ์ชื่อผู้ติดต่อ, เบอร์โทร หรืออีเมล์..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={18} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f8f9fa",
                            "&:hover": {
                                backgroundColor: "#e9ecef",
                            },
                            "&.Mui-focused": {
                                backgroundColor: "#fff",
                            }
                        }
                    }}
                />
            )}
        />
    );
};

export default CustomerAutocomplete;
