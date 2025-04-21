"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import { usePathname } from "next/navigation";
import Layout from "./components/ui/admin/layout";
import Components from "./components/ui/shadcn";

export default function Providers({ children }: { children: React.ReactNode }) {
  const {
    SidebarProvider,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    Sidebar,
    SidebarInset,
    Separator,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } = Components;

  const [queryClient] = useState(() => new QueryClient());
  const path = usePathname();

  return (
    <>
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
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator
                      className="
                        hidden
                        md:block
                      "
                    />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div
              className="
                flex
                flex-col
                p-4
                flex-1
                gap-4
                pt-0
              "
            >
              <div
                className="
                  grid
                  gap-4
                  auto-rows-min
                  md:grid-cols-3
                "
              >
                <div
                  className="
                    aspect-video
                    rounded-xl
                    bg-muted/50
                  "
                />
                <div
                  className="
                    aspect-video
                    rounded-xl
                    bg-muted/50
                  "
                />
                <div
                  className="
                    aspect-video
                    rounded-xl
                    bg-muted/50
                  "
                />
              </div>
              <div
                className="
                  min-h-[100vh]
                  flex-1
                  rounded-xl
                  bg-muted/50
                  md:min-h-min
                "
              />
            </div>
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
    </>
  );
}
