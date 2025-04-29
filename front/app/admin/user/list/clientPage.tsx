"use client";

import { useMemo, useState } from "react";
import Components from "../../../../components/shadcn";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import { UserDTO, userDTOSchema } from "../../../../types/user";
import { DragHandle, DragTable } from "@components/admin/table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type UserDTOType = z.infer<typeof userDTOSchema>;

const data: UserDTO[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  email: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
  userName: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  nickName: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  type: `${i < 5 ? ["naver", "git", "google", "git", "google"][i] : "kakao"}`,
  isAdmin: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
  createdAt: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
  updatedAt: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
  isDelete: false,
  reason: "",
}));

export default function ClientPage() {
  const {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    Button,
    Badge,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    CustomFormMessage,
    Input,
    Textarea,
  } = Components;

  const [dataResult, setDataResult] = useState(data);
  const columnHelper = createColumnHelper<UserDTO>();

  const userDTOForm = useForm<UserDTOType>({
    resolver: zodResolver(userDTOSchema),
    defaultValues: {
      reason: "",
    },
  });

  const userDTOOnSubmit = (data: UserDTOType) => {
    console.log(data);
  };

  const exitSubmit = (data: UserDTOType) => {
    console.log(data);
  };

  const columns = useMemo<ColumnDef<UserDTO>[]>(
    () => [
      columnHelper.display({
        id: "drag",
        header: "",
        size: 10,
        maxSize: 10,
        minSize: 10,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      }),

      columnHelper.accessor("id", {
        header: "ID",
        size: 10,
        maxSize: 10,
        minSize: 10,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("email", {
        header: "이메일",
        size: 80,
        maxSize: 80,
        minSize: 80,
      }),
      columnHelper.accessor("userName", {
        header: "이름",
        size: 80,
        maxSize: 80,
        minSize: 80,
      }),
      columnHelper.accessor("nickName", {
        header: "닉네임",
        size: 80,
        maxSize: 80,
        minSize: 80,
      }),
      columnHelper.accessor("type", {
        header: "회원가입유형",
        size: 70,
        maxSize: 70,
        minSize: 70,
        cell: ({ row }) => (
          <>
            <Badge className={row.original.type}>{row.original.type}</Badge>
          </>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        size: 15,
        maxSize: 15,
        minSize: 15,
        cell: ({ row }) => (
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="
                    text-[11px]
                    w-[50px]
                    h-[20px]
                    p-[0]
                  "
                  onClick={() => {
                    userDTOForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  회원정보
                </Button>
              </SheetTrigger>
              <SheetContent
                className="
                  w-[600px]
                  sm:max-w-none
                "
              >
                <Form {...userDTOForm}>
                  <form
                    onSubmit={userDTOForm.handleSubmit(
                      userDTOOnSubmit,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <SheetHeader>
                      <SheetTitle>회원정보</SheetTitle>
                      <SheetDescription>
                        회원가입한 회원의 정보를 확인할 수 있습니다.
                      </SheetDescription>
                    </SheetHeader>

                    <FormField
                      control={userDTOForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>ID</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="이메일을 입력하세요"
                              {...field}
                              disabled={true}
                            />
                          </FormControl>
                          <CustomFormMessage name="email" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="이름을 입력하세요"
                              {...field}
                              autoFocus
                            />
                          </FormControl>
                          <CustomFormMessage name="userName" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="nickName"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>닉네임</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="닉네임을 입력하세요"
                              {...field}
                              autoFocus
                            />
                          </FormControl>
                          <CustomFormMessage name="nickName" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>회원가입유형</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge
                              className="
                                kakao
                              "
                            >
                              {field.value}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>회원가입날짜</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <SheetFooter>
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
        size: 15,
        maxSize: 15,
        minSize: 15,
        cell: ({ row }) => (
          <>
            <Dialog>
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
                    userDTOForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  회원탈퇴
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>회원탈퇴</DialogTitle>
                  <DialogDescription>
                    회원탈퇴를 진행 후 동일한 계정은 사용할 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <Form {...userDTOForm}>
                  <form
                    onSubmit={userDTOForm.handleSubmit(exitSubmit, (errors) => {
                      console.log("유효성 에러 발생:", errors);
                    })}
                  >
                    <FormField
                      control={userDTOForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>회원이름</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDTOForm.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>탈퇴이유</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="탈퇴이유를 작성해주세요."
                              className="
                                resize-none
                              "
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <DialogFooter
                      className="
                        mt-[10px]
                      "
                    >
                      <Button
                        type="submit"
                        className="
                          w-full
                        "
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
    [],
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 15, //default page size
  });

  const table = useReactTable({
    data: dataResult,
    columns,
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
      className="
        flex
        flex-col
        justify-center
        items-end
      "
    >
      <DragTable<UserDTO>
        table={table}
        dataResult={dataResult}
        setDataResult={setDataResult}
        pagination={pagination}
        columns={columns}
      />
    </article>
  );
}
