
import {
  IconReceipt2,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const useMenuItems = () => {
  return [
    {
      id: uniqueId(),
      title: "ใบเสนอราคา",
      icon: IconReceipt2,
      href: `/quotation`,
    },
    {
      id: uniqueId(),
      title: "ข้อมูลบริษัท",
      icon: IconReceipt2,
      href: ``,
    },
    {
      id: uniqueId(),
      title: "ข้อมูลลูกค้า",
      icon: IconReceipt2,
      href: ``,
    },
    {
      id: uniqueId(),
      title: "ข้อมูลสินค้า",
      icon: IconReceipt2,
      href: ``,
    },
  ];
};
