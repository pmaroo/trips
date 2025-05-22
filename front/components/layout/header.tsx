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
          justify-end
          z-[1000]
          fixed
          top-[10px]
          right-0
          p-[20px]
          w-auto
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
