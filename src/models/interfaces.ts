import { SvgIconProps } from "@mui/material";

export interface SidebarMenuItem {
  id: string;
  caption: string;
  path?: string;
  isDisables?: boolean;
  icon?: React.ReactElement<SvgIconProps>;
  divider: boolean;
  childrens?: SidebarMenuItem[];
}

export interface SideBarListItemProps {
  isParentOpened?: boolean;
  isOpened?: boolean;
}

export interface SidebarMenuContainerProps {
  isOpened: boolean;
}
