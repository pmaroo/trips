import { MapPin, Users } from "@deemlol/next-icons";
import React from "react";

export interface MenuDTO {
  file: string;
  icon: React.ReactElement;
  title: string;
  subMenu: SubMenuDTO[];
}

export interface SubMenuDTO {
  title: string;
  link: string;
}

export const Menu: MenuDTO[] = [
  {
    file: "/user",
    icon: (
      <Users
        size={24}
        style={{
          cursor: `pointer`,
        }}
      />
    ),
    title: "회원관리",
    subMenu: [
      {
        title: "회원관리",
        link: "/list",
      },
      {
        title: "방문자통계",
        link: "/day",
      },
      {
        title: "일정관리",
        link: "/plan",
      },
      {
        title: "관리자회원관리",
        link: "/adminUser",
      },
    ],
  },
  {
    file: "/place",
    icon: (
      <MapPin
        size={24}
        style={{
          cursor: `pointer`,
        }}
      />
    ),
    title: "장소관리",
    subMenu: [
      {
        title: "장소관리",
        link: "/list",
      },
      {
        title: "카테고리관리",
        link: "/category",
      },
      {
        title: "태그관리",
        link: "/tag",
      },
    ],
  },
];
