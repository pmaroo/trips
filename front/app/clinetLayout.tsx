"use client";

import { useEffect, useState } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { usePathname } from "next/navigation";
import Layout from "../components/admin/layout";
import Components from "../components/shadcn";
import { Menus } from "../types/menu";
import { ThemeProvider } from "next-themes";
import { JwtUserDTO } from "../types/user";
import { useMeState, useTokenState } from "@store/commonStore";
import Login from "@components/admin/layout/login";
import axios from "axios";

export default function ClientLayout({
  children,
  me,
  accessToken,
  refreshToken,
}: {
  children: React.ReactNode;
  me: JwtUserDTO;
  accessToken: string;
  refreshToken: string;
}) {
  const {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
    Separator,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [url, setUrl] = useState<{ title: string }>({ title: "" });
  const [isMount, setMount] = useState(false);
  const [subUrl, setSubUrl] = useState<{ title: string }>({ title: "" });

  const path = usePathname();

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const meStore = useMeState((state) => state);
  const tokenStore = useTokenState((state) => state);

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenStore.setAccessToken(accessToken);
      tokenStore.setRefreshToken(refreshToken);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (me) {
      meStore.setMe(me);
    }
  }, []);

  useEffect(() => {
    if (path.includes("admin")) {
      const urlResult =
        path === "/admin"
          ? { title: "홈" }
          : Menus.navMain.find((value) => path.includes(value.url));
      const subUrlResult =
        path === "/admin"
          ? { title: "" }
          : Menus.navMain
              .find((value) => path.includes(value.url))
              .items.find((value) => path.includes(value.url));

      setUrl(urlResult);
      setSubUrl(subUrlResult);
    }
  }, []);

  useEffect(() => {
    setMount(true);
  }, []);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  if (!isMount) {
    return null;
  }

  return (
    <>
      <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
        {path.includes("admin") ? (
          meStore.me && meStore.me.isAdmin ? (
            <SidebarProvider>
              <Layout />
              <SidebarInset>
                <header
                  className="
                    flex
                    items-center
                    h-16
                    shrink-0
                    gap-2
                    transition-[width,height]
                    ease-linear
                    group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                    "
                  >
                    <SidebarTrigger
                      className="
                        -ml-1
                      "
                    />
                    <Separator
                      orientation="vertical"
                      className="
                        h-4
                        mr-2
                      "
                    />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem
                          className="
                            hidden
                            md:block
                          "
                        >
                          {url.title}
                        </BreadcrumbItem>
                        {path !== "/admin" && (
                          <BreadcrumbSeparator
                            className="
                              hidden
                              md:block
                            "
                          />
                        )}
                        <BreadcrumbItem>
                          <BreadcrumbPage>{subUrl.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>

                <section
                  className="
                    px-[20px]
                    size-full
                  "
                >
                  {children}
                </section>
              </SidebarInset>
            </SidebarProvider>
          ) : (
            <Login />
          )
        ) : (
          <>
            <header>
              <Header />
            </header>
            <section
              className="
                mt-[60px]
                overflow-hidden
              "
            >
              {children}
            </section>
            <footer>
              <Footer />
            </footer>
          </>
        )}
      </ThemeProvider>
    </>
  );
}
