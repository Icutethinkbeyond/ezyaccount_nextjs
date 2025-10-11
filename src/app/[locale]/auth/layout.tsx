"use client";

import React from "react";
import AutohideSnackbar from "@/components/shared/SnackBarCustom";
import CustomNotification from "@/components/shared/CustomNotifications";
import { SnackbarProvider } from "@/contexts/SnackbarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <SnackbarProvider> 
      <CustomNotification/>
      {children}
      </SnackbarProvider>
    </>
  );
}
