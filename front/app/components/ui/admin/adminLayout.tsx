"use client";

import { Grid, LogOut } from "@deemlol/next-icons";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Menu, MenuDTO, SubMenuDTO } from "./menu";
import { usePathname } from "@node_modules/next/navigation";
import Components from "../shadcn";

// 누를때마다 애니메이션이 반복되도록 다시 설정

export default function AdminLayout() {
  const {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } = Components;

  const path = usePathname();

  const [isAllMenuOpen, setIsAllMenuOpen] = useState<Boolean>(false);
  const [menuIndex, setMenuIndex] = useState<string | null>(null);

  const allMenuToggle = useCallback(() => {
    if (menuIndex) {
      setMenuIndex(null);
      setIsAllMenuOpen(true);
      return;
    }
    setIsAllMenuOpen(!isAllMenuOpen);
  }, [isAllMenuOpen, menuIndex]);

  const menuIndexHandler = useCallback(
    (index: string) => {
      setIsAllMenuOpen(true);

      if (menuIndex === index) {
        setIsAllMenuOpen(!isAllMenuOpen);
        setMenuIndex(null);
      } else {
        setMenuIndex(index);
      }
    },
    [menuIndex, isAllMenuOpen],
  );

  const items = [
    {
      title: "Home",
      url: "#",
    },
    {
      title: "Inbox",
      url: "#",
    },
    {
      title: "Calendar",
      url: "#",
    },
    {
      title: "Search",
      url: "#",
    },
    {
      title: "Settings",
      url: "#",
    },
  ];

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <section
        className="
          flex
          flex-row
          items-center
          justify-center
          w-full
          h-screen
        "
      >
        <ul
          className="
            flex
            flex-row
            items-center
            relative
            justify-end
            size-full
          "
        >
          <li
            className="
              flex
              flex-col
              items-center
              h-full
              shadow-md
              justify-between
              fixed
              top-0
              left-0
              w-[70px]
              bg-[var(--background)]
              px-[5px]
              py-[20px]
              z-[100]
              shadow-[rgba(0,0,0,0.2)]
            "
          >
            <motion.div
              whileHover={{
                transform: `rotate(90deg)`,
                transition: { duration: 0.5 },
              }}
              style={{
                cursor: `pointer`,
              }}
              onClick={allMenuToggle}
            >
              <Grid size={24} color="var(--foreground)" />
            </motion.div>

            <div>
              {Menu.map((data: MenuDTO, index: number) => {
                return (
                  <motion.div
                    key={index}
                    initial={{
                      transform: `scale(1)`,
                    }}
                    whileHover={{
                      transform: `scale(1.1)`,
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => menuIndexHandler(String(index))}
                  >
                    <div
                      className={
                        menuIndex === String(index) ||
                        path.includes(`/admin` + data.file)
                          ? "text-[var(--point)] duration-500 my-[120px] hover:text-[var(--point)]"
                          : "text-[var(--sidebar-border)] duration-500 my-[120px] hover:text-[var(--point)]"
                      }
                    >
                      {data.icon}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{
                transform: `scale(1)`,
              }}
              whileHover={{
                transform: `scale(1.1)`,
                transition: { duration: 0.5 },
              }}
            >
              <LogOut
                size={24}
                color="var(--foreground)"
                style={{
                  cursor: `pointer`,
                }}
              />
            </motion.div>
          </li>

          <motion.div
            initial={{
              transform: `translateX(-260px)`,
            }}
            transition={{ duration: 0.7 }}
            animate={{
              transform: isAllMenuOpen
                ? `translateX(70px)`
                : `translateX(-260px)`,
            }}
            style={{
              height: `100%`,
              position: `fixed`,
              top: `0`,
              left: `0`,
            }}
          >
            <li
              className="
                flex
                flex-col
                items-start
                justify-start
                h-full
                shadow-md
                w-[260px]
                bg-[var(--sidebar-accent)]
                p-[20px]
                z-[99]
                shadow-[rgba(0,0,0,0.2)]
              "
            >
              <h1
                className="
                  font-[700]
                  mb-[20px]
                  text-[16px]
                "
              >
                {Menu[menuIndex] ? Menu[menuIndex].title : "전체메뉴"}
              </h1>

              {menuIndex === null && (
                <a href="/admin">
                  <p
                    className={
                      path === "/admin"
                        ? "text-[13px] mb-[10px] pl-[10px] text-[var(--point)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                        : "text-[13px] mb-[10px] pl-[10px] text-[var(--muted-foreground)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                    }
                  >
                    메인
                  </p>
                </a>
              )}

              {Menu[menuIndex]
                ? Menu[menuIndex].subMenu.map(
                    (data: SubMenuDTO, index: number) => {
                      return (
                        <a
                          href={`/admin` + Menu[menuIndex].file + data.link}
                          key={index}
                        >
                          <p
                            className={
                              path.includes(data.link)
                                ? "text-[13px] mb-[10px] pl-[10px] text-[var(--point)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                                : "text-[13px] mb-[10px] pl-[10px] text-[var(--muted-foreground)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                            }
                          >
                            {data.title}
                          </p>
                        </a>
                      );
                    },
                  )
                : Menu.map((data: MenuDTO, index: number) => {
                    return (
                      <div
                        key={index}
                        className="
                          flex
                          flex-col
                          items-start
                          justify-start
                        "
                      >
                        <h1
                          className="
                            font-[700]
                            mb-[10px]
                            text-[14px]
                          "
                        >
                          {data.title}
                        </h1>

                        {data.subMenu.map((value: SubMenuDTO, idx: number) => {
                          return (
                            <a
                              href={`/admin` + data.file + value.link}
                              key={idx}
                            >
                              <p
                                className={
                                  path.includes(value.link)
                                    ? "text-[13px] mb-[10px] pl-[10px] text-[var(--point)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                                    : "text-[13px] mb-[10px] pl-[10px] text-[var(--muted-foreground)] cursor-[pointer] duration-500 hover:text-[var(--point)]"
                                }
                              >
                                {value.title}
                              </p>
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
            </li>
          </motion.div>
          <li
            className="
              flex
              flex-col
              items-center
              justify-center
              h-full
              w-[calc(100%-70px)]
              bg-[var(--sidebar)]
            "
          >
            {children}
          </li>
        </ul>
      </section> */}
    </>
  );
}
