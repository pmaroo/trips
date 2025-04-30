"use client";

import { MapPin, Users } from "@deemlol/next-icons";

export interface MenuDTO {
  navMain: {
    title: string;
    url: string;
    icon: React.ReactElement;
    isActive: Boolean;
    items: {
      title: string;
      url: string;
    }[];
  }[];
}

export const Menus: MenuDTO = {
  navMain: [
    {
      title: "회원관리",
      url: "/user",
      icon: <Users />,
      isActive: false,
      items: [
        {
          title: "방문자통계",
          url: "/day",
        },
        {
          title: "회원리스트",
          url: "/list",
        },
        {
          title: "일정관리",
          url: "/plan",
        },
        {
          title: "관리자회원관리",
          url: "/adminUser",
        },
      ],
    },
    {
      title: "장소관리",
      url: "/place",
      icon: <MapPin />,
      isActive: false,
      items: [
        {
          title: "장소리스트",
          url: "/list",
        },
        {
          title: "카테고리관리",
          url: "/category",
        },
        {
          title: "태그관리",
          url: "/tag",
        },
      ],
    },
  ],
};
