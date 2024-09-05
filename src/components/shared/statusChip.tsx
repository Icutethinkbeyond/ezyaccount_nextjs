import { Chip } from "@mui/material";
import React from "react";

interface StatusChipProps {
  status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <div>
      {status === "approve" && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "success.main",
            color: "#fff",
          }}
          size="small"
          label={status}
        ></Chip>
      )}
      {status === "draft" && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "secondary.main",
            color: "#fff",
          }}
          size="small"
          label={status}
        ></Chip>
      )}
      {status === "reject" && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "error.main",
            color: "#fff",
          }}
          size="small"
          label={status}
        ></Chip>
      )}
    </div>
  );
};

export default StatusChip;
