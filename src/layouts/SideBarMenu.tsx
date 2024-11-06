import PATHS from "@/constants/Navigation";
import { SidebarMenuItem } from "@/models/interfaces";
import {
  Category,
  List,
  FeaturedPlayList,
  GridView,
  Ballot,
} from "@mui/icons-material";

export const menuItems: SidebarMenuItem[] = [
  {
    id: "parentProduct",
    caption: "Product",
    divider: true,
    icon: <List />,
    childrens: [
      {
        id: "product-list",
        caption: "Products",
        path: PATHS.PRODUCTS,
        icon: <GridView />,
        divider: false,
      },
      {
        id: "variants-list",
        caption: "Variants",
        path: PATHS.VARIANTS,
        icon: <Ballot />,
        divider: false,
      },
      {
        id: "category",
        caption: "Category",
        path: PATHS.CATEGORY,
        icon: <Category />,
        divider: false,
      },
      {
        id: "attributes",
        caption: "Attributes",
        path: PATHS.ADDITIONAL_ATTRIBUTES,
        icon: <FeaturedPlayList />,
        divider: false,
      },
    ],
  }
]