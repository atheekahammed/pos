import PATHS from "@/constants/Navigation";
import { SidebarMenuItem } from "@/models/interfaces";
import {
  Category,
  List,
  FeaturedPlayList,
  GridView,
  Ballot,
  Inventory,
  StoreOutlined,
  ShoppingBasketOutlined,
  DomainVerification,
  Store,
  ShoppingBasket,
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
  },
  {
    id: "inventory",
    caption: "Inventory",
    divider: true,
    icon: <Inventory />,
    childrens: [
      {
        id: "stocks",
        caption: "Stocks",
        path: PATHS.STOCKS,
        icon: <DomainVerification />,
        divider: false,
      },]
  },
  {
    id: "sales",
    caption: "Sales",
    divider: true,
    icon: <Store />,
    childrens: [
      {
        id: "Sales",
        caption: "Sales",
        path: PATHS.SALES,
        icon: <ShoppingBasket />,
        divider: false,
      },]
  }
]