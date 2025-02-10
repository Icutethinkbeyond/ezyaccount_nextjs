import { Box, Grid2 } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";

function CustomToolbar() {
  return (
    <Grid2 container mb={2} mt={2}>
      <GridToolbarContainer>
        <GridToolbarColumnsButton
          slotProps={{
            button: { variant: "outlined" },
          }}
        />
        <GridToolbarFilterButton
          slotProps={{
            button: { variant: "outlined" },
          }}
        />
        <GridToolbarDensitySelector
          slotProps={{
            button: { variant: "outlined" },
            tooltip: { title: "Change density" },
          }}
        />
        <Box sx={{ flexGrow: 1 }} />

        {/* <GridToolbarExport
    slotProps={{
      // tooltip: { title: 'Export data' },
      // button: { variant: 'outlined' },
      des
    }}
  /> */}
      </GridToolbarContainer>
    </Grid2>
  );
}

export default CustomToolbar;
