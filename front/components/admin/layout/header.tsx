"use client";

import * as React from "react";
import Components from "../../shadcn";

export function Header() {
  const { SidebarMenu, SidebarMenuButton, SidebarMenuItem } = Components;

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
            className="
              grid
              text-left
              text-sm
              flex-1
              leading-tight
            "
          >
            <span
              className="
                font-semibold
                truncate
              "
            >
              관리자님
            </span>
            <span
              className="
                text-xs
                truncate
              "
            >
              환영합니다
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
