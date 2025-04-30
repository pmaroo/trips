"use client";

import * as React from "react";
import Components from "../../shadcn";
import { useMeState } from "@store/commonStore";

export function Header() {
  const { SidebarMenu, SidebarMenuButton, SidebarMenuItem } = Components;

  const meStore = useMeState((state) => state);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="
            data-[state=open]:bg-[var(--sidebar-accent)]
            data-[state=open]:text-[var(--sidebar-accent-foreground)]
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              rounded-lg
              aspect-square
              size-8
              bg-[var(--sidebar-primary)]
              text-[var(--sidebar-primary-foreground)]
              text-[10px]
            "
          >
            FTW
          </div>
          <div
            className="grid flex-1 text-sm leading-tight text-left "
          >
            <span
              className="font-semibold truncate "
            >
              {meStore.me.nickName}님
            </span>
            <span
              className="text-xs truncate "
            >
              환영합니다
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
