import React from "react";
import { Box, Typography } from "@mui/material";

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    padding?: number;
}

/**
 * Reusable form section component with consistent styling
 * Used for wrapping form fields with a border and title
 */
const FormSection: React.FC<FormSectionProps> = ({
    title,
    children,
    padding = 3
}) => {
    return (
        <Box
            p={padding}
            sx={{
                border: "1px solid #e5eaef",
                borderRadius: "12px",
                height: "100%",
                backgroundColor: "#ffffff"
            }}
        >
            <Typography variant="h5" fontWeight={500} gutterBottom sx={{ mb: 2, color: "text.primary" }}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default FormSection;
