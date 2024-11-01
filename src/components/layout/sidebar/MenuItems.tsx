import { 
   CollectionsBookmark, Group, Handyman,
   Dashboard, Settings, RequestQuote,
   Folder
} from "@mui/icons-material";
import {
  IconHome, IconPackage, IconChartInfographic,
  IconReceipt2
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const useMenuItems = () => {

  return [
    {
      id: uniqueId(),
      title: "หน้าหลัก", // ชื่อเมนู
      icon: IconHome, // ไอคอนของเมนู
      href: `/dashboard`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
    {
      id: uniqueId(),
      title: "ภาพรวม", // ชื่อเมนู
      icon: Dashboard, // ไอคอนของเมนู
      href: `/dashboard`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
    {
      id: uniqueId(),
      title: "รายรับ",
      icon: IconReceipt2,
      href: `/income`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ใบเสนอราคา",
          href: `/income/quotation`,
        },
        {
          id: uniqueId(),
          title: "ใบวางบิล/ใบแจ้งหนี้",
          href: `/income/billing`,
        },
        {
          id: uniqueId(),
          title: "ใบเสร็จรับเงิน/ใบกำกับภาษี",
          href: `/income/receipt-and-taxinvoice`,
        },
        {
          id: uniqueId(),
          title: "ใบลดหนี้",
          href: `/income/credit`,
        },
        {
          id: uniqueId(),
          title: "ใบเพิ่มหนี้",
          href: `/income/debit`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "รายจ่าย",
      icon: RequestQuote,
      href: `/expenses`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ใบสั่งซื้อ",
          href: `/expenses`,
        },
        {
          id: uniqueId(),
          title: "ใบรับสินค้า",
          href: `/expenses/purchase`,
        },
        {
          id: uniqueId(),
          title: "บันทึกค่าใช้จ่าย",
          href: `/expenses/expense-list`,
        },
        {
          id: uniqueId(),
          title: "ใบหัก ณ ที่จ่าย",
          href: `/expenses/withholding-slip`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "สินค้า/บริการ",
      icon: IconPackage,
      href: `/productandservice`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการสินค้า/บริการ",
          href: `/productandservice/productandservice-list`,
        },
        {
          id: uniqueId(),
          title: "หมวดหมู่สินค้า",
          href: `/productandservice/category-list`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ผู้ใช้งาน/ลูกค้า",
      icon: Group,
      href: `/user-and-customer`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการผู้ใช้งาน/ลูกค้า",
          href: `/user-and-customer/user-and-customer-lists`,
        },
        {
          id: uniqueId(),
          title: "เพิ่มผู้ใช้งาน/ลูกค้า",
          href: `/user-and-customer/add-user-and-customer`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "รายงาน",
      icon: IconChartInfographic,
      href: `/report`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ยอดขาย",
          href: `/report/sales`,
        },
        {
          id: uniqueId(),
          title: "ใบวางบิล",
          href: `/report/invoice`,
        },
        {
          id: uniqueId(),
          title: "กำไรขาดทุน",
          href: `/report/profit-and-loss`,
        },
        {
          id: uniqueId(),
          title: "ใบสั่งซื้อ",
          href: `/report/purchase-order`,
        },
        {
          id: uniqueId(),
          title: "ค่าใช้จ่าย",
          href: `/report/expense-report`,
        },
        {
          id: uniqueId(),
          title: "ภาษีขาย",
          href: `/report/sales-tax`,
        },
        {
          id: uniqueId(),
          title: "ภาษีซื้อ",
          href: `/report/purchase-tax`,
        },
        {
          id: uniqueId(),
          title: "ภาษีหัก ณ ที่จ่าย",
          href: `/report/withholding-tax`,
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
          href: `/archive`,
        },
        {
          id: uniqueId(),
          title: "เพิ่มไฟล์",
          href: `/archive/add-archive`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ตั้งค่า", // ชื่อเมนู
      icon: Settings, // ไอคอนของเมนู
      href: `/settings`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
  ];
};
