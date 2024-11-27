import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  title: string;
  breadcrumbs?: { name: string; href?: string }[];
}

const BreadcrumbCustom: React.FC<BreadcrumbProps> = ({ title, breadcrumbs = [] }) => {
  return (
    <div>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginBottom: 2 }} // Add some margin below
      >
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={breadcrumb.href}
            >
              {breadcrumb.name}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {breadcrumb.name}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbCustom;
