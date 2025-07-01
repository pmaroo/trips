"use client";

import Components from "@components/shadcn";
import { useTheme } from "next-themes";
import { LayoutGrid, Moon, Sun } from "lucide-react";
import { useRouter } from "@node_modules/next/navigation";
import { useMeState } from "@store/commonStore";
import { Logo } from "@components/svg/logo";

export default function Header() {
  const { Button } = Components;
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const meStore = useMeState((state) => state);

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
          justify-between
          z-[1000]
          fixed
          top-[10px]
          right-0
          p-[20px]
          w-auto
        "
      >
        <div
          className="
            flex
            flex-row
            w-auto
            mr-[10px]
          "
        >
          <Button
            variant="outline"
            size="icon"
            onClick={themeHandler}
            className="
              mr-[10px]
            "
          >
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

          {meStore.me && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/mypage`)}
            >
              <LayoutGrid />
            </Button>
          )}
        </div>
        <Logo width={`60px`} height={`60px`} />
      </article>
    </>
  );
}
