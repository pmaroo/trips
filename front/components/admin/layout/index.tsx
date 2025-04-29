"use client";

import Components from "../../shadcn";
import { Header } from "./header";
import { Menu } from "./menu";
import { NavUser } from "./navUser";
import { Menus } from "../../../types/menu";

export default function Layout({
  ...props
}: React.ComponentProps<typeof Components.Sidebar>) {
  const { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } =
    Components;

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Header />
        </SidebarHeader>
        <SidebarContent>
          <Menu items={Menus.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={Menus.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
