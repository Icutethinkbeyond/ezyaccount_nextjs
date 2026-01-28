import React from "react";
import { Box } from "@mui/material";

const QuotationFooter: React.FC = () => {
  return (
    <Box sx={{ marginTop: "auto", pt: 1 }}>
      {/* Blue footer with diagonal design */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#1565c0",
          height: "40px",
          width: "100%",
          overflow: "hidden", // กันส่วนเกินของ pseudo-element
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "150px",
            height: "100%",
            backgroundColor: "#0d47a1",
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
          },
        }}
      />
    </Box>
  );
};

export default QuotationFooter;