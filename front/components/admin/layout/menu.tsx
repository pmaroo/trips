"use client";

import { ChevronRight, Home, type LucideIcon } from "lucide-react";
import Components from "../../shadcn";
import { usePathname } from "@node_modules/next/navigation";

export function Menu({ items }) {
  const {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } = Components;

  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>여행일정홈페이지</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          asChild
          className={
            path === "/admin"
              ? `bg-[rgba(0,0,0,0.03)] group/collapsible`
              : "group/collapsible"
          }
        >
          <SidebarMenuItem>
            <a href="/admin">
              <SidebarMenuButton tooltip={"홈"}>
                <Home />
                <span
                  className={
                    path === "/admin"
                      ? "text-[hsl(var(--point))] font-[700]"
                      : "text-[[hsl(var(--foreground))]]"
                  }
                >
                  홈
                </span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        </Collapsible>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={
              path.includes(item.url)
                ? `bg-[rgba(0,0,0,0.03)] group/collapsible`
                : "group/collapsible"
            }
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span
                    className={
                      path.includes(item.url)
                        ? "text-[hsl(var(--point))] font-[700]"
                        : "text-[var(--foreground)]"
                    }
                  >
                    {item.title}
                  </span>
                  <ChevronRight
                    className="
                      ml-auto
                      transition-transform
                      duration-200
                      group-data-[state=open]/collapsible:rotate-90
                    "
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className={
                        path.includes(subItem.url)
                          ? "font-[700] text-[hsl(var(--point))]"
                          : ""
                      }
                    >
                      <SidebarMenuSubButton asChild>
                        <a href={`/admin` + item.url + subItem.url}>
                          <span
                            className={
                              path.includes(subItem.url)
                                ? "text-[var(--foreground)] font-[700]"
                                : "text-[var(--muted-foreground)] duration-500 hover:text-[hsl(var(--point))]"
                            }
                          >
                            {subItem.title}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
