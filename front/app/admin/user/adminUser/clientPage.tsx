"use client";

import { useEffect, useMemo, useState } from "react";
import Components from "../../../../components/shadcn";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import {
  CreateUser,
  ExitUser,
  UpdateUser,
  UserDTO,
} from "../../../../types/user";
import { DragHandle, DragTable } from "@components/admin/table";
import { PlusCircle } from "@deemlol/next-icons";
import {
  useAdminUser,
  useCreateUser,
  useExitUser,
  useUpdateUser,
} from "@hooks/reactQuery/useUser";
import {
  useCreateUserForm,
  useExitUserForm,
  useUpdateUserForm,
  useUserDTOForm,
} from "../../../../hooks/form/useUserForm";

export default function ClientPage() {
  const {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPortal,
    Button,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    CustomFormMessage,
    Badge,
    SheetFooter,
    DialogFooter,
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [dataResult, setDataResult] = useState<UserDTO[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isExit, setIsExit] = useState<number | null>(null);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const adminUserData = useAdminUser(true);
  const createUserData = useCreateUser(() => {
    setIsCreate(false);
  });
  const updateUserData = useUpdateUser(() => {
    setIsExit(null);
  });
  const exitUserData = useExitUser(() => {});

  //////////////////////////////////////////////////////////////
  //  FORM
  //////////////////////////////////////////////////////////////

  const createUserForm = useCreateUserForm();
  const updateUserForm = useUpdateUserForm();
  const exitUserForm = useExitUserForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (adminUserData.isSuccess) {
      setDataResult(adminUserData.data);
    }
  }, [adminUserData.isSuccess, adminUserData.data]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const exitToggle = (data: number) => {
    if (data === isExit) {
      setIsExit(null);
    } else {
      setIsExit(data);
    }
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const createUserHandler = (data: CreateUser) => {
    const userData = {
      email: data.email,
      password: data.password,
      userName: data.userName,
      nickName: data.nickName,
      isAdmin: true,
      type: "관리자회원가입",
    };

    createUserData.mutate(userData);
  };

  const updateUserHandler = (data: UpdateUser) => {
    const userData = {
      id: data.id,
      email: data.email,
      password: data.password,
      userName: data.userName,
      nickName: data.nickName,
    };

    updateUserData.mutate(userData);
  };

  const exitUserHandler = (data: ExitUser) => {
    const userData = {
      id: data.id,
      createdAt: data.createdAt,
      userName: data.userName,
      isDelete: true,
      reason: data.reason,
    };

    exitUserData.mutate(userData);
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////

  const columnHelper = createColumnHelper<UserDTO>();
  const columns = useMemo<ColumnDef<UserDTO>[]>(
    () => [
      columnHelper.display({
        id: "drag",
        header: "",
        size: 10,
        minSize: 10,
        maxSize: 10,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      }),

      columnHelper.accessor("id", {
        header: "ID",
        enableColumnFilter: false,
        size: 10,
        minSize: 10,
        maxSize: 10,
      }),
      columnHelper.accessor("userName", {
        header: "이름",
        size: 80,
        minSize: 80,
        maxSize: 80,
      }),
      columnHelper.accessor("email", {
        header: "이메일",
        size: 80,
        minSize: 80,
        maxSize: 80,
      }),
      columnHelper.accessor("nickName", {
        header: "닉네임",
        size: 80,
        minSize: 80,
        maxSize: 80,
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        size: 20,
        minSize: 20,
        maxSize: 20,
        cell: ({ row }) => (
          <>
            <Sheet key="right">
              <SheetTrigger asChild>
                <Button
                  className="
                    text-[11px]
                    w-[50px]
                    h-[20px]
                    p-[0]
                  "
                  onClick={() => {
                    updateUserForm.reset(row.original);
                  }}
                  tabIndex={-1}
                >
                  회원정보
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>관리자 회원정보</SheetTitle>
                  <SheetDescription>
                    관리자 회원의 정보를 확인할 수 있습니다.
                  </SheetDescription>
                </SheetHeader>

                <Form {...updateUserForm}>
                  <form
                    onSubmit={updateUserForm.handleSubmit(
                      updateUserHandler,
                      (err) => {
                        console.log(err);
                      },
                    )}
                  >
                    <FormField
                      control={updateUserForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge>{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="이메일을 입력하세요"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="email" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateUserForm.control}
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
                              placeholder="비밀번호를 입력하세요"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="password" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateUserForm.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="이름을 입력하세요" {...field} />
                          </FormControl>
                          <CustomFormMessage name="userName" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateUserForm.control}
                      name="nickName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>닉네임</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="닉네임을 입력하세요"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="nickName" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={updateUserForm.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>가입날짜</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge>{field.value.toString()}</Badge>
                          </FormControl>
                          <CustomFormMessage name="nickName" />
                        </FormItem>
                      )}
                    />

                    <SheetFooter
                      className="
                        mt-[30px]
                      "
                    >
                      <Button type="submit">수정하기</Button>
                    </SheetFooter>
                  </form>
                </Form>
              </SheetContent>
            </Sheet>
          </>
        ),
      }),
      columnHelper.display({
        id: "actions2",
        header: "",
        size: 20,
        minSize: 20,
        maxSize: 20,
        cell: ({ row }) => (
          <>
            <Dialog
              open={row.original.id === isExit ? true : false}
              onOpenChange={() => exitToggle(row.original.id)}
            >
              <DialogTrigger asChild>
                <Button
                  className="
                    text-[11px]
                    w-[50px]
                    h-[20px]
                    p-[0]
                  "
                  variant="destructive"
                  onClick={() => {
                    exitUserForm.reset({
                      ...row.original,
                      createdAt: new Date(row.original.createdAt),
                      reason: "블랙리스트 및 홈페이지 이용 불가",
                    });
                  }}
                  tabIndex={-1}
                >
                  회원탈퇴
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정말 회원탈퇴 하시겠습니까?</DialogTitle>
                  <DialogDescription>
                    회원탈퇴 후 해당 이메일은 사용할 수 없습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...exitUserForm}>
                  <form
                    onSubmit={exitUserForm.handleSubmit(
                      exitUserHandler,
                      (err) => console.log(err),
                    )}
                  >
                    <FormField
                      control={exitUserForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>ID</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge>{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={exitUserForm.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>회원이름</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge>{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={exitUserForm.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>탈퇴이유</FormLabel>
                          <FormControl>
                            <Input
                              autoFocus
                              {...field}
                              placeholder="탈퇴 이유를 작성해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="reason" />
                        </FormItem>
                      )}
                    />

                    <DialogFooter
                      className="
                        mt-[20px]
                      "
                    >
                      <Button
                        variant="destructive"
                        type="submit"
                        className="w-full "
                      >
                        탈퇴하기
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </>
        ),
      }),
    ],
    [updateUserForm, exitUserForm, dataResult, isExit],
  );

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 15, //default page size
  });

  const table = useReactTable({
    data: dataResult,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    autoResetPageIndex: false,
    state: {
      //...
      pagination,
    },
  });

  return (
    <article
      className="flex flex-col items-end justify-center "
    >
      <ul
        className="
          flex
          flex-row
          items-center
          justify-start
          w-full
          mb-[10px]
        "
      >
        <li
          className="w-auto "
        >
          <Dialog open={isCreate} onOpenChange={() => setIsCreate(!isCreate)}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="
                  text-[13px]
                  h-[30px]
                "
              >
                <PlusCircle size={16} /> 회원가입
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>관리자 회원가입</DialogTitle>
                  <DialogDescription>
                    관리자 회원가입 후 해당 아이디로 관리자 로그인할 수
                    있습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...createUserForm}>
                  <form
                    onSubmit={createUserForm.handleSubmit(createUserHandler)}
                  >
                    <FormField
                      control={createUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="이메일을 입력하세요"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="email" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createUserForm.control}
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
                              placeholder="비밀번호를 입력하세요"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="password" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createUserForm.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="이름을 입력하세요" {...field} />
                          </FormControl>
                          <CustomFormMessage name="userName" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createUserForm.control}
                      name="nickName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[10px]
                          "
                        >
                          <FormLabel>닉네임</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="닉네임을 입력하세요"
                              {...field}
                            />
                          </FormControl>
                          <CustomFormMessage name="nickName" />
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
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </li>
      </ul>

      {adminUserData.isLoading ? (
        <Badge>로딩중</Badge>
      ) : (
        <DragTable<UserDTO>
          table={table}
          dataResult={dataResult}
          setDataResult={setDataResult}
          pagination={pagination}
          columns={columns}
        />
      )}
    </article>
  );
}
