"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import Components from "../../shadcn";
import { useMeState } from "@store/commonStore";

export function NavUser({}: {}) {
  const {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } = Components;
  const { isMobile } = useSidebar();

  const meStore = useMeState((state) => state);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              "
            >
              <Avatar
                className="w-8 h-8 rounded-lg "
              >
                <AvatarFallback
                  className="rounded-lg "
                >
                  FTW
                </AvatarFallback>
              </Avatar>
              <div
                className="grid flex-1 text-sm leading-tight text-left "
              >
                <span
                  className="font-semibold truncate "
                >
                  {meStore.me.userName}
                </span>
                <span
                  className="text-xs truncate "
                >
                  {meStore.me.email}
                </span>
              </div>
              <ChevronsUpDown
                className="ml-auto  size-4"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="
              w-[--radix-dropdown-menu-trigger-width]
              min-w-56
              rounded-lg
            "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel
              className="p-0 font-normal "
            >
              <div
                className="
                  flex
                  items-center
                  text-left
                  text-sm
                  gap-2
                  px-1
                  py-1.5
                "
              >
                <Avatar
                  className="w-8 h-8 rounded-lg "
                >
                  <AvatarFallback
                    className="rounded-lg "
                  >
                    FTW
                  </AvatarFallback>
                </Avatar>
                <div
                  className="grid flex-1 text-sm leading-tight text-left "
                >
                  <span
                    className="font-semibold truncate "
                  >
                    {meStore.me.userName}
                  </span>
                  <span
                    className="text-xs truncate "
                  >
                    {meStore.me.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
