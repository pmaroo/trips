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
import { useLogoutUser } from "@hooks/reactQuery/useUser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "@node_modules/@types/react";

export function NavUser({}: {}) {
  const {
    Avatar,
    AvatarFallback,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } = Components;
  const { isMobile } = useSidebar();

  const router = useRouter();
  const path = usePathname();

  const meStore = useMeState((state) => state);
  const logoutUser = useLogoutUser(() => {
    router.push(`/admin`);
    meStore.clearMe();
  });

  const logoutHandler = () => {
    const data = {
      id: meStore.me.id,
    };

    logoutUser.mutate(data);
  };

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

            <DropdownMenuItem onClick={() => logoutHandler()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
