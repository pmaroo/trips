"use client";

import { motion } from "framer-motion";
import Components from "@components/shadcn/index";
import { cn } from "../../shadcn/lib/utils";
import { useLoginUserForm } from "@hooks/form/useUserForm";
import { LoginUser } from "../../../types/user";
import { useAdminLoginUser } from "@hooks/reactQuery/useUser";
import { useMeState } from "@store/commonStore";
import { useEffect, useState } from "react";

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
    Form,
    FormControl,
    FormItem,
    FormLabel,
    CustomFormMessage,
    FormField,
  } = Components;
  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [isLogin, setIsLogin] = useState<boolean>(false);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const adminLoginUser = useAdminLoginUser(() => {});

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const meStore = useMeState((state) => state);

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const loginUserForm = useLoginUserForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (meStore.me) {
      setIsLogin(true);
    }
  }, []);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const loginHandler = (data: LoginUser) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    adminLoginUser.mutate(userData);
    setIsLogin(true);
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////

  return (
    <>
      <motion.div
        initial={{
          transform: meStore.me?.isAdmin
            ? `translateX(-100%)`
            : `translateX(0)`,
        }}
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
          className="flex items-center justify-center w-full p-6  min-h-svh md:p-10"
        >
          <div
            className="w-full max-w-sm "
          >
            <div className={cn("flex flex-col gap-6", className)} {...props}>
              <Card>
                <CardHeader>
                  <CardTitle
                    className="text-2xl "
                  >
                    Login
                  </CardTitle>
                  <CardDescription>
                    관리자에 오신 걸 환영합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginUserForm}>
                    <form onSubmit={loginUserForm.handleSubmit(loginHandler)}>
                      <FormField
                        control={loginUserForm.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>이메일</FormLabel>
                              <FormControl>
                                <Input
                                  autoFocus
                                  {...field}
                                  placeholder="이메일을 입력해주세요."
                                />
                              </FormControl>
                              <CustomFormMessage name="email" />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={loginUserForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem
                            className="
                              mt-[10px]
                            "
                          >
                            <FormLabel>비밀번호</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                              />
                            </FormControl>
                            <CustomFormMessage name="password" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="
                          w-full
                          mt-[20px]
                        "
                      >
                        로그인
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
