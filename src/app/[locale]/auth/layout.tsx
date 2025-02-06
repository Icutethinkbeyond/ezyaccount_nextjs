"use client";

import React from "react";
import AutohideSnackbar from "@/components/shared/SnackBarCustom";
import { useSnackbarContext } from "@/contexts/SnackbarContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpenDialog, openDialog, snackbar } = useSnackbarContext();
  return (
    <>
      <AutohideSnackbar
        handleOpen={setOpenDialog}
        open={openDialog}
        message={snackbar.message}
        notiColor={snackbar.notiColor}
      />
      {children}
    </>
  );
}
