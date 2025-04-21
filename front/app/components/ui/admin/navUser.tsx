"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import Components from "../shadcn";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
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
                className="
                  w-8
                  h-8
                  rounded-lg
                "
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback
                  className="
                    rounded-lg
                  "
                >
                  FTW
                </AvatarFallback>
              </Avatar>
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
                  {user.name}
                </span>
                <span
                  className="
                    text-xs
                    truncate
                  "
                >
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown
                className="
                  ml-auto
                  size-4
                "
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
              className="
                p-0
                font-normal
              "
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
                  className="
                    w-8
                    h-8
                    rounded-lg
                  "
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback
                    className="
                      rounded-lg
                    "
                  >
                    FTW
                  </AvatarFallback>
                </Avatar>
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
                    {user.name}
                  </span>
                  <span
                    className="
                      text-xs
                      truncate
                    "
                  >
                    {user.email}
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
