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
    // {
    //   id: uniqueId(),
    //   title: "หน้าหลัก", // ชื่อเมนู
    //   icon: IconHome, // ไอคอนของเมนู
    //   href: `/admin/dashboard`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    // },
    {
      id: uniqueId(),
      title: "ภาพรวม", // ชื่อเมนู
      icon: Dashboard, // ไอคอนของเมนู
      href: `/admin/dashboard`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
    {
      id: uniqueId(),
      title: "รายรับ",
      icon: IconReceipt2,
      href: `/admin/income`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ใบเสนอราคา",
          href: `/admin/income/quotation`,
        },
        // {
        //   id: uniqueId(),
        //   title: "ใบวางบิล/ใบแจ้งหนี้",
        //   href: `/admin/income/billing`,
        // },
        // {
        //   id: uniqueId(),
        //   title: "ใบเสร็จรับเงิน/ใบกำกับภาษี",
        //   href: `/admin/income/invoice`,
        // },
        // {
        //   id: uniqueId(),
        //   title: "ใบลดหนี้",
        //   href: `/admin/income/credit`,
        // },
        // {
        //   id: uniqueId(),
        //   title: "ใบเพิ่มหนี้",
        //   href: `/admin/income/debit`,
        // },
      ],
    },
    // {
    //   id: uniqueId(),
    //   title: "รายจ่าย",
    //   icon: RequestQuote,
    //   href: `/admin/expenses`,
    //   // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
    //   children: [
    //     {
    //       id: uniqueId(),
    //       title: "ใบสั่งซื้อ",
    //       href: `/admin/expenses/purchase-order`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ใบรับสินค้า",
    //       href: `/admin/expenses/receipt`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "บันทึกค่าใช้จ่าย",
    //       href: `/admin/expenses/record-expenses`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ใบหัก ณ ที่จ่าย",
    //       href: `/admin/expenses/withholding-slip`,
    //     },
    //   ],
    // },
    {
      id: uniqueId(),
      title: "สินค้า/บริการ",
      icon: IconPackage,
      href: `/admin/product-and-service`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการสินค้า/บริการ",
          href: `/admin/product-and-service/productandservice-list`,
        },
        {
          id: uniqueId(),
          title: "หมวดหมู่สินค้า",
          href: `/admin/product-and-service/category-list`,
        },
      ],
    },
    {
      id: uniqueId(),
      title: "ผู้ใช้งาน/ลูกค้า",
      icon: Group,
      href: `/admin/user-and-customer`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "รายการผู้ใช้งาน/ลูกค้า",
          href: `/admin/user-and-customer/user-and-customer-lists`,
        },
        {
          id: uniqueId(),
          title: "เพิ่มผู้ใช้งาน/ลูกค้า",
          href: `/admin/user-and-customer/add-user-and-customer`,
        },
      ],
    },
    // {
    //   id: uniqueId(),
    //   title: "รายงาน",
    //   icon: IconChartInfographic,
    //   href: `/admin/report`,
    //   // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
    //   children: [
    //     {
    //       id: uniqueId(),
    //       title: "ยอดขาย",
    //       href: `/admin/report/salesSummary`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ใบวางบิล",
    //       href: `/admin/report/billingSummary`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "กำไรขาดทุน",
    //       href: `/admin/report/profit-and-loss`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ใบสั่งซื้อ",
    //       href: `/admin/report/purchase-order`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ค่าใช้จ่าย",
    //       href: `/admin/report/expense-report`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ภาษีขาย",
    //       href: `/admin/report/sales-tax`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ภาษีซื้อ",
    //       href: `/admin/report/purchase-tax`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "ภาษีหัก ณ ที่จ่าย",
    //       href: `/admin/report/withholding-tax`,
    //     },
    //   ],
    // },
    // {
    //   id: uniqueId(),
    //   title: "คลังสื่อ",
    //   icon: Folder,
    //   href: `/admin/archive`,
    //   // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
    //   children: [
    //     {
    //       id: uniqueId(),
    //       title: "รายการคลังสื่อ",
    //       href: `/admin/archive/archive-list`,
    //     },
    //     {
    //       id: uniqueId(),
    //       title: "เพิ่มไฟล์",
    //       href: `/admin/archive/add-archive`,
    //     },
    //   ],
    // },
    {
      id: uniqueId(),
      title: "ตั้งค่า", // ชื่อเมนู
      icon: Settings, // ไอคอนของเมนู
      href: `/admin/settings`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
  ];
};
