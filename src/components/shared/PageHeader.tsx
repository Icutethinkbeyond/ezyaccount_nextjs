import React from "react";
import { Box, Typography, Button, Grid2 } from "@mui/material";

interface PageHeaderProps {
    title: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
    return (
        <Grid2 container mb={1} spacing={2}>
            <Grid2 size={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                    <Typography variant="h3" component="div">
                        {title}
                    </Typography>
                    {actions && (
                        <Box display="flex" gap={1}>
                            {actions}
                        </Box>
                    )}
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default PageHeader;
