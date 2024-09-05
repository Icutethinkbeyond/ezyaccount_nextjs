"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductsProvider } from "@/contexts/productServiceListContext";
import { Prompt } from "next/font/google";
import { DatabaseProvider } from "@/contexts/dbContext";

const prompt = Prompt({
  subsets: ["thai", "latin"], // Specify subsets if needed
  weight: ["400", "700"], // Specify the font weights you need
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <ProductsProvider>
            <DatabaseProvider>{children}</DatabaseProvider>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
