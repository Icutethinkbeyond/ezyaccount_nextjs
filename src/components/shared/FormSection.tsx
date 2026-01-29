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
        <Box p={padding} border="1px solid #ccc" borderRadius="8px">
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default FormSection;
