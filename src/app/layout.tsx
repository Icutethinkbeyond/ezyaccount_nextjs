import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProviders } from "@/../lib/SessionProviders";
import { ProductsProvider } from "@/contexts/productServiceListContext";
import { Prompt } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const prompt = Prompt({
  subsets: ["thai", "latin"], // Specify subsets if needed
  weight: ["400", "700"], // Specify the font weights you need
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={prompt.className}>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <ProductsProvider>
            <SessionProviders>
                  <NextIntlClientProvider messages={messages}>
                    {children}
                  </NextIntlClientProvider>
                </SessionProviders>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
