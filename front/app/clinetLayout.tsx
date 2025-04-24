"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import { usePathname } from "next/navigation";
import Layout from "./components/ui/admin/layout";
import Components from "./components/ui/shadcn";
import { Menus } from "./types/menu";
import { ThemeProvider } from "next-themes";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
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

  const [queryClient] = useState(() => new QueryClient());
  const [url, setUrl] = useState<{ title: string }>({ title: "" });
  const [subUrl, setSubUrl] = useState<{ title: string }>({ title: "" });
  const path = usePathname();

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

  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <>
      <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
        {path.includes("admin") ? (
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
                  className="flex items-center gap-2 px-4 "
                >
                  <SidebarTrigger
                    className="-ml-1 "
                  />
                  <Separator
                    orientation="vertical"
                    className="h-4 mr-2 "
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem
                        className="hidden  md:block"
                      >
                        {url.title}
                      </BreadcrumbItem>
                      {path !== "/admin" && (
                        <BreadcrumbSeparator
                          className="hidden  md:block"
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
          <>
            <header>
              <Header />
            </header>
            <QueryClientProvider client={queryClient}>
              <section>{children}</section>
            </QueryClientProvider>
            <footer>
              <Footer />
            </footer>
          </>
        )}
      </ThemeProvider>
    </>
  );
}
