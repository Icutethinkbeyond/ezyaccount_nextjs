import { CollectionsBookmark, Group, Handyman } from "@mui/icons-material";
import {
  IconHome,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const useMenuItems = () => {

  return [
    {
      id: uniqueId(),
      title: "เมนู 1",
      icon: IconHome,
      href: `/dashboard`,
    },
    {
      id: uniqueId(),
      title: "รายรับ",
      icon: CollectionsBookmark,
      href: `/income`,
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
