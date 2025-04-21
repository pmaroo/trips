"use client";

import { MapPin, Users } from "@deemlol/next-icons";
import Components from "../shadcn";
import { Header } from "./header";
import { Menu } from "./menu";
import { NavUser } from "./navUser";

// 누를때마다 애니메이션이 반복되도록 다시 설정

export default function Layout({
  ...props
}: React.ComponentProps<typeof Components.Sidebar>) {
  const { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } =
    Components;

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "회원관리",
        url: "#",
        icon: <Users />,
        isActive: false,
        items: [
          {
            title: "방문자통계",
            url: "#",
          },
          {
            title: "회원관리",
            url: "#",
          },
          {
            title: "일정관리",
            url: "#",
          },
          {
            title: "관리자회원관리",
            url: "#",
          },
        ],
      },
      {
        title: "장소관리",
        url: "#",
        icon: <MapPin />,
        items: [
          {
            title: "장소관리",
            url: "#",
          },
          {
            title: "카테고리관리",
            url: "#",
          },
          {
            title: "태그관리",
            url: "#",
          },
        ],
      },
    ],
  };
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Header />
        </SidebarHeader>
        <SidebarContent>
          <Menu items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
