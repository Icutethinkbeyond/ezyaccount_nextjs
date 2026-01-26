import { Chip } from "@mui/material";
import {
  DocumentStatus,
  RoleName,
  UserStatus,
} from "@prisma/client";
import React from "react";

interface StatusProps {
  status: string | null | undefined;
  message?: string;
}

const Status: React.FC<StatusProps> = ({ status, message }) => {
  return (
    <div>
      {/* Green (Active, Returned, Completed) */}
      {(status === "active" ||
        status === "returned" ||
        status === "completed" ||
        status === UserStatus.Active) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "success.main",
            color: "#fff",
          }}
          size="small"
          label={
            message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          }
        ></Chip>
      )}

      {/* Gray (Inactive, Unrepairable) */}
      {(status === "inactive" || status === "unrepairable") && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "secondary.main",
            color: "#fff",
          }}
          size="small"
          label={
            message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          }
        ></Chip>
      )}

      {(
        status === "" ||
        status === DocumentStatus.Cancel) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "primary.main",
            color: "#fff",
          }}
          size="small"
          label={
            message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          }
        ></Chip>
      )}

      {/* Red (Waiting, Overdue, Cancelled) */}
      {(status === "waiting" ||
        status === "overdue" ||
        status === "cancelled" ||
        status === UserStatus.InActice) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "error.main",
            color: "#fff",
          }}
          size="small"
          // label={
          //   message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          // }
        ></Chip>
      )}

      {/* Yellow (Damaged, On Hold) */}
      {(status === "damaged" ||
        status === "on-hold" ||
        status === DocumentStatus.Draft) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "primary.main",
            color: "#fff",
          }}
          size="small"
          label={
            message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          }
        ></Chip>
      )}

      {/* Light Blue (Returned Partially, Parts Ordered) */}
      {(status === "returned-partially" ||
        status === "parts-ordered" ||
        status === RoleName.Developer) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "info.main",
            color: "#fff",
          }}
          size="small"
          label={
            message
              ? message
              : status.charAt(0).toUpperCase() +
                status.slice(1).replace("-", " ")
          }
        ></Chip>
      )}

      {/* Dark Blue (In Progress, Awaiting Approval, Under Review, Ready for Pickup, Pending) */}
      {(status === "in-progress" ||
        status === "awaiting-approval" ||
        status === "under-review" ||
        status === "ready-for-pickup" ||
        status === "pending" ||
        status === RoleName.User) && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "primary.main",
            color: "#fff",
          }}
          size="small"
          label={
            message
              ? message
              : status.charAt(0).toUpperCase() +
                status.slice(1).replace("-", " ")
          }
        ></Chip>
      )}

      {/* Light Green (Borrowed) */}
      {status === "borrowed" && (
        <Chip
          sx={{
            pl: "4px",
            pr: "4px",
            backgroundColor: "success.light",
            color: "success.main",
          }}
          size="small"
          label={
            message ? message : status.charAt(0).toUpperCase() + status.slice(1)
          }
        ></Chip>
      )}
    </div>
  );
};

export default Status;
