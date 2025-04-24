"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Components from "@app/components/ui/shadcn/index";
import { cn } from "../../shadcn/lib/utils";

export default function Login({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    Button,
    Input,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
  } = Components;
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const loginHandler = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);
  return (
    <>
      <motion.div
        animate={{
          transform: isLogin ? `translateX(-100%)` : `translateX(0)`,
        }}
        transition={{ duration: 0.7, ease: "ease" }}
        style={{
          width: `100%`,
          height: `100vh`,
          position: `fixed`,
          top: `0`,
          left: `0`,
          zIndex: `1000`,
          background: `#fff`,
        }}
      >
        <div
          className="
            flex
            items-center
            justify-center
            w-full
            p-6
            min-h-svh
            md:p-10
          "
        >
          <div
            className="
              w-full
              max-w-sm
            "
          >
            <div className={cn("flex flex-col gap-6", className)} {...props}>
              <Card>
                <CardHeader>
                  <CardTitle
                    className="
                      text-2xl
                    "
                  >
                    Login
                  </CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div
                      className="
                        flex
                        flex-col
                        gap-6
                      "
                    >
                      <div
                        className="
                          grid
                          gap-2
                        "
                      >
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                      <div
                        className="
                          grid
                          gap-2
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                          "
                        >
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="
                              inline-block
                              text-sm
                              ml-auto
                              underline-offset-4
                              hover:underline
                            "
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <Input id="password" type="password" required />
                      </div>
                      <Button
                        type="submit"
                        className="
                          w-full
                        "
                        onClick={loginHandler}
                      >
                        Login
                      </Button>
                      <Button
                        variant="outline"
                        className="
                          w-full
                        "
                      >
                        Login with Google
                      </Button>
                    </div>
                    <div
                      className="
                        text-center
                        text-sm
                        mt-4
                      "
                    >
                      Don&apos;t have an account?{" "}
                      <a
                        href="#"
                        className="
                          underline
                          underline-offset-4
                        "
                      >
                        Sign up
                      </a>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
