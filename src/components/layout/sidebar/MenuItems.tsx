
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
  ];
};
