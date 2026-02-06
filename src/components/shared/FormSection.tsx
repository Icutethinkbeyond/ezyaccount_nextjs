import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    padding?: number;
}

/**
 * Reusable form section component with clean styling
 */
const FormSection: React.FC<FormSectionProps> = ({
    title,
    children,
    padding = 3
}) => {
    const theme = useTheme();

    return (
        <Box
            p={padding}
            sx={{
                borderRadius: "12px",
                height: "100%",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
        >
            <Typography
                variant="h4"
                fontWeight={600}
                gutterBottom
                sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    pb: 1.5,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default FormSection;
