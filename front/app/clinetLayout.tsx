"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const path = usePathname();

  return (
    <>
      <header>{path.includes("admin") ? <></> : <Header />}</header>
      <QueryClientProvider client={queryClient}>
        <section>{children}</section>
      </QueryClientProvider>
      <footer>{path.includes("admin") ? <></> : <Footer />}</footer>
    </>
  );
}
