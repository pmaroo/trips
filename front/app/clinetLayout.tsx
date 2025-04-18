"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import { usePathname } from "next/navigation";
import AdminLayout from "./components/ui/admin/adminLayout";
import Components from "./components/ui/shadcn";

export default function Providers({ children }: { children: React.ReactNode }) {
  const {
    SidebarProvider,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    Sidebar,
  } = Components;

  const [queryClient] = useState(() => new QueryClient());
  const path = usePathname();

  return (
    <>
      {path.includes("admin") ? (
        <SidebarProvider>
          <AdminLayout />
          <QueryClientProvider client={queryClient}>
            <SidebarTrigger />
            {children}
          </QueryClientProvider>
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
