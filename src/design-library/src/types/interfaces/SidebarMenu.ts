export interface ISidebarMenuItem {
  title: string;
  link: string;
  active: boolean;
}

export interface ISidebarMenuItems {
  title: string;
  icon: string;
  link: string;
  active: boolean;
  expanded?: boolean;
  children: ISidebarMenuItem[];
}
