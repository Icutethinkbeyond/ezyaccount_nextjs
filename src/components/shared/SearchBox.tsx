import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    placeholder = "ค้นหา..."
}) => {
    return (
        <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search sx={{ color: "#03c9d7", fontSize: 22 }} />
                    </InputAdornment>
                ),
                endAdornment: value ? (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={() => onChange("")}
                            edge="end"
                            sx={{
                                '&:hover': {
                                    color: '#d33',
                                },
                            }}
                        >
                            <Clear fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            sx={{
                mb: 1,
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s ease-in-out',
                    '& fieldset': {
                        borderColor: '#e5eaef',
                    },
                    '&:hover fieldset': {
                        borderColor: '#03c9d7',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#03c9d7',
                        borderWidth: '2px',
                    },
                },
                '& .MuiInputBase-input': {
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    '&::placeholder': {
                        color: '#5A6A85',
                        opacity: 1,
                    },
                },
            }}
        />
    );
};

export default SearchBox;
