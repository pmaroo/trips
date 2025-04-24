"use client";

import { useMemo, useState } from "react";
import Components from "../../../components/ui/shadcn";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import { TestUser, userSchema } from "@app/types/user";
import { DragHandle, DragTable } from "@app/components/ui/admin/table";
import { PlusCircle } from "@deemlol/next-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type TestUserType = z.infer<typeof userSchema>;

const data: TestUser[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  email: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
}));

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
  } = Components;

  const [dataResult, setDataResult] = useState(data);
  const columnHelper = createColumnHelper<TestUser>();

  const columns = useMemo<ColumnDef<TestUser>[]>(
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
      columnHelper.accessor("name", { header: "이름" }),
      columnHelper.accessor("email", { header: "이메일" }),
      columnHelper.display({
        id: "actions",
        header: "",
        size: 20,
        minSize: 20,
        maxSize: 20,
        cell: ({ row }) => (
          <>
            <Sheet key={"right"}>
              <SheetTrigger asChild>
                <Button
                  className="
                    text-[11px]
                    w-[50px]
                    h-[20px]
                    p-[0]
                  "
                >
                  회원정보
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
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
                >
                  회원탈퇴
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
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

  const form = useForm<TestUserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: 0,
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: TestUser) => {
    console.log(data);
    console.log(form);
  };

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
          <Dialog>
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

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
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
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mt-[20px]
                          "
                        >
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="이름을 입력하세요" {...field} />
                          </FormControl>
                          <CustomFormMessage name="name" />
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
      <DragTable<TestUser>
        table={table}
        dataResult={dataResult}
        setDataResult={setDataResult}
        pagination={pagination}
        columns={columns}
      />
    </article>
  );
}
