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
                        <Search sx={{ color: "action.active", fontSize: 20 }} />
                    </InputAdornment>
                ),
                endAdornment: value ? (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={() => onChange("")}
                            edge="end"
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
                    borderRadius: '8px'
                }
            }}
        />
    );
};

export default SearchBox;
