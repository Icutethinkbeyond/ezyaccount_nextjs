import { Prompt } from "next/font/google";

// import mutiMassages next-intl
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { SessionProviders } from "../../lib/SessionProviders";
import { NotifyProvider } from "@/contexts/NotifyContext";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import ThemeRegistry from "@/components/themeRegistry/ThemeRegistry";
import { ProductProvider } from "@/contexts/ProductContext";
import { QuotationProvider } from "@/contexts/QuotationContext";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  if (!["en", "th"].includes(locale)) {
    // ไม่ใช้ notFound() แต่สามารถส่ง error ไปที่ console หรือแสดงข้อความ
    console.error("Invalid locale provided, using default locale");
  }

  return (
    <html lang={locale}>
      <body>
        <SessionProviders>
          <NotifyProvider>
            <BreadcrumbProvider>
              <ProductProvider>
                <QuotationProvider>
                <NextIntlClientProvider messages={messages}>
                  <ThemeRegistry>{children}</ThemeRegistry>
                </NextIntlClientProvider>
                </QuotationProvider>
              </ProductProvider>
            </BreadcrumbProvider>
          </NotifyProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
