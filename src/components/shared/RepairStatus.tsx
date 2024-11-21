import React from "react";
import {
  Chip,
  ChipProps,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface RepairStatusProps {
  status: "completed" | "unrepairable";
}

const RepairStatus: React.FC<RepairStatusProps> = ({ status }) => {
  const getStatusInfo = (): {
    label: string;
    color: ChipProps["color"];
    icon: any;
    message: string;
  } => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          color: "success",
          icon: <CheckCircleIcon color="success" />,
          message: "The repair has been successfully completed.",
        };
      case "unrepairable":
        return {
          label: "Unrepairable",
          color: "error",
          icon: <ErrorIcon color="error" />,
          message: "Unfortunately, this item cannot be repaired.",
        };
      default:
        return {
          label: "Unknown",
          color: "default",
          icon: null,
          message: "Status unknown.",
        };
    }
  };

  const { label, color, icon, message } = getStatusInfo();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "20vh",
          textAlign: "center",
        }}
      >
        {/* {icon} */}
        <Chip sx={{ mt: 5 }} label={label} color={color} icon={icon} />
        <Typography mt={2} variant="body2">
          {message}
        </Typography>
        {/* <Button
          variant="contained"
          color="secondary"
          size="small"
          // onClick={handleWithdraw}
          sx={{ mt: 3 }}
        >
          View Report
        </Button> */}
      </Box>
    </Container>
  );
};

export default RepairStatus;
