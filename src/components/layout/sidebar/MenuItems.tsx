import { 
  Group,
  Dashboard, Settings,
  Folder,
  RequestQuote,
} from "@mui/icons-material";
import {
  IconChartInfographic,
 IconHome, IconPackage, 
 IconReceipt2
} from "@tabler/icons-react";

import { uniqueId } from "lodash";
import { Pin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export const useMenuItems = () => {
  const t = useTranslations("Menus");
  const localActive = useLocale();

  return [
    {
      id: uniqueId(),
      title: t("menu1"),
      icon: Dashboard,
      href: `/${localActive}/protected/dashboard`,
    },

    {
      id: uniqueId(),
      title: "รายรับ",
      icon: IconReceipt2,
      href: `/${localActive}/protected/income`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ใบเสนอราคา",
          href: `/${localActive}/protected/income/quotation`,
        },
        {
          id: uniqueId(),
          title: "ใบวางบิล/ใบแจ้งหนี้",
          href: `/${localActive}/protected/income/billing`,
        },
        {
          id: uniqueId(),
          title: "ใบเสร็จรับเงิน/ใบกำกับภาษี",
          href: `/${localActive}/protected/income/invoice`,
        },
        {
          id: uniqueId(),
          title: "ใบลดหนี้",
          href: `/${localActive}/protected/income/credit`,
        },
        {
          id: uniqueId(),
          title: "ใบเพิ่มหนี้",
          href: `/${localActive}/protected/income/debit`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "รายจ่าย",
      icon: RequestQuote,
      href: `/${localActive}/protected/expenses`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ใบสั่งซื้อ",
          href: `/${localActive}/protected/expenses/purchase-order`,
        },
        {
          id: uniqueId(),
          title: "ใบรับสินค้า",
          href: `/${localActive}/protected/expenses/receipt`,
        },
        {
          id: uniqueId(),
          title: "บันทึกค่าใช้จ่าย",
          href: `/${localActive}/protected/expenses/record-expenses`,
        },
        {
          id: uniqueId(),
          title: "ใบหัก ณ ที่จ่าย",
          href: `/${localActive}/protected/expenses/withholding-slip`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "สินค้า/บริการ",
      icon: IconPackage,
      href: `/${localActive}/protected/product-and-service`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการสินค้า/บริการ",
          href: `/${localActive}/protected/product-and-service`,
        },
        {
          id: uniqueId(),
          title: "หมวดหมู่สินค้า",
          href: `/${localActive}/protected/product-and-service/category`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ผู้ใช้งาน/ลูกค้า",
      icon: Group,
      href: `/${localActive}/protected/user-and-customer`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการผู้ใช้งาน/ลูกค้า",
          href: `/${localActive}/protected/user-and-customer/user-and-customer-lists`,
        },
        // {
        //   id: uniqueId(),
        //   title: "เพิ่มผู้ใช้งาน/ลูกค้า",
        //   href: `/${localActive}/protected/user-and-customer/user-and-customer-lists`,
        // },
      ],
    },
    {
      id: uniqueId(),
      title: "รายงาน",
      icon: IconChartInfographic,
      href: `/${localActive}/protected/report`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ยอดขาย",
          href: `/${localActive}/protected/report/salesSummary`,
        },
        {
          id: uniqueId(),
          title: "ใบวางบิล",
          href: `/${localActive}/protected/report/billingSummary`,
        },
        {
          id: uniqueId(),
          title: "กำไรขาดทุน",
          href: `/${localActive}/protected/report/profit-and-loss`,
        },
        {
          id: uniqueId(),
          title: "ใบสั่งซื้อ",
          href: `/${localActive}/protected/report/purchase-order`,
        },
        {
          id: uniqueId(),
          title: "ค่าใช้จ่าย",
          href: `/${localActive}/protected/report/expense-report`,
        },
        {
          id: uniqueId(),
          title: "ภาษีขาย",
          href: `/${localActive}/protected/report/sales-tax`,
        },
        {
          id: uniqueId(),
          title: "ภาษีซื้อ",
          href: `/${localActive}/protected/report/purchase-tax`,
        },
        {
          id: uniqueId(),
          title: "ภาษีหัก ณ ที่จ่าย",
          href: `/${localActive}/protected/report/withholding-tax`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "คลังสื่อ",
      icon: Folder,
      href: `/archive`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการคลังสื่อ",
          href: `/${localActive}/protected/archive/archive-list`,
        },
        {
          id: uniqueId(),
          title: "เพิ่มไฟล์",
          href: `/${localActive}/protected/archive/add-archive`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ตั้งค่า", // ชื่อเมนู
      icon: Settings, // ไอคอนของเมนู
      href: `/${localActive}/protected/settings`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
  ];
};
