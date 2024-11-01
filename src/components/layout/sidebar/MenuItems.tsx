import { CollectionsBookmark, Group, Handyman } from "@mui/icons-material";
import {
  IconHome,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const useMenuItems = () => {

  return [
    {
      id: uniqueId(),
      title: "เมนู 1", // ชื่อเมนู
      icon: IconHome, // ไอคอนของเมนู
      href: `/dashboard`, // ลิงก์ของเมนูโดยอ้างอิงตาม Folder ในการเข้าถึง หากไม่เข้าใจอ่านเพิ่ม https://nextjs.org/docs/app/building-your-application/routing/pages
    },
    {
      id: uniqueId(),
      title: "รายรับ",
      icon: CollectionsBookmark,
      href: `/income`,
      // กรณีมีซัพเมนูให้ใส่ตาม format ด้านล่าง หากไม่มีดูตามเมนูที่ 1
      children: [
        {
          id: uniqueId(),
          title: "ซับเมนู 1",
          href: `/borrowing-system`,
        },
        {
          id: uniqueId(),
          title: "ซับเมนู 2",
          href: `/borrowing-system/add-borrow-document`,
        },
        {
          id: uniqueId(),
          title: "ซับเมนู 3",
          href: `/borrowing-system/reports`,
        },
      ],
    },
  ];
};
