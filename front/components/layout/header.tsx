"use client";

import Components from "@components/shadcn";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { Button } = Components;
  const { theme, setTheme } = useTheme();

  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <article
        className="
          flex
          flex-row
          items-center
          w-full
          justify-end
          z-[1000]
          fixed
          top-[10px]
          left-0
          p-[20px]
        "
      >
        <Button variant="outline" size="icon" onClick={themeHandler}>
          {theme === "dark" ? (
            <Sun
              className="
                text-[hsl(var(--foreground))]
              "
            />
          ) : (
            <Moon
              className="
                text-[hsl(var(--foreground))]
              "
            />
          )}
        </Button>
      </article>
    </>
  );
}
