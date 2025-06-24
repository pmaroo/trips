"use client";

import { DragHandle, DragTable } from "@components/admin/table";
import { CreatePlan, PlanDTO } from "../../../../types/plan";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { useReactTable } from "@tanstack/react-table";
import Components from "@components/shadcn";
import { useForm } from "react-hook-form";
import { useRouter } from "@node_modules/next/navigation";

export default function ClientPage({ plan }) {
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

  const [dataResult, setDataResult] = useState<PlanDTO[]>(plan);
  const columnHelper = createColumnHelper<PlanDTO>();

  const router = useRouter();

  const planDTOForm = useForm<PlanDTO>({});

  const onSubmit = (data: PlanDTO) => {
    console.log(data);
  };

  const columns = useMemo<ColumnDef<PlanDTO>[]>(
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
      columnHelper.accessor("User", {
        header: "회원이름",
        size: 30,
        maxSize: 30,
        minSize: 30,
        enableColumnFilter: false,
        cell: ({ row }) => row.original.User.userName,
      }),
      columnHelper.accessor("destination", {
        header: "여행장소",
        size: 80,
        maxSize: 80,
        minSize: 80,
        cell: ({ row }) => row.original.destination.name,
      }),
      columnHelper.accessor("start", {
        header: "출발장소",
        size: 80,
        maxSize: 80,
        minSize: 80,
        cell: ({ row }) => row.original.start.name,
      }),
      columnHelper.accessor("Category", {
        header: "카테고리",
        size: 80,
        maxSize: 80,
        minSize: 80,
        cell: ({ row }) => row.original.Category.name,
      }),
      columnHelper.accessor("createdAt", {
        header: "작성날짜",
        size: 80,
        maxSize: 80,
        minSize: 80,
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
                    planDTOForm.reset(row.original); // form 초기화
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
                <Form {...planDTOForm}>
                  <form
                    onSubmit={planDTOForm.handleSubmit(onSubmit, (errors) => {
                      console.log("유효성 에러 발생:", errors);
                    })}
                  >
                    <SheetHeader>
                      <SheetTitle>일정정보</SheetTitle>
                      <SheetDescription>
                        회원이 생성한 일정을 확인할 수 있습니다.
                      </SheetDescription>
                    </SheetHeader>

                    <FormField
                      control={planDTOForm.control}
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
                      control={planDTOForm.control}
                      name="User"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>회원정보</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">
                              {field.value.id} / {field.value.userName} /{" "}
                              {field.value.mobile} / {field.value.type}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={planDTOForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>카테고리</FormLabel>
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
                      control={planDTOForm.control}
                      name="traffic"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>이동수단</FormLabel>
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
                      control={planDTOForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>날짜</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">
                              {field.value[0].year}-{field.value[0].month}-
                              {field.value[0].day} ~{" "}
                              {field.value[field.value.length - 1].year}-
                              {field.value[field.value.length - 1].month}-
                              {field.value[field.value.length - 1].day}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={planDTOForm.control}
                      name="start"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>출발장소</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value.name}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={planDTOForm.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>여행장소</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">{field.value.name}</Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={planDTOForm.control}
                      name="days"
                      render={({ field }) => (
                        <>
                          {field.value.map((data, index) => {
                            return (
                              <FormItem
                                className="
                                  mb-[10px]
                                  px-[20px]
                                "
                                key={index}
                              >
                                <FormLabel>{index + 1}일차</FormLabel>
                                {data.map((value, idx) => {
                                  return (
                                    <FormControl
                                      className="flex flex-col items-start "
                                      key={`${index}-${idx}`}
                                    >
                                      <Badge
                                        variant="outline"
                                        className="w-auto "
                                      >
                                        {value.category_group_name} /{" "}
                                        {value.address_name} /{" "}
                                        {value.place_name} / 이동시간:{" "}
                                        {Math.floor(value.duration / 3600)}시간{" "}
                                        {Math.floor(
                                          (value.duration % 3600) / 60,
                                        )}
                                        분
                                      </Badge>
                                    </FormControl>
                                  );
                                })}
                              </FormItem>
                            );
                          })}
                        </>
                      )}
                    />

                    <FormField
                      control={planDTOForm.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                            px-[20px]
                          "
                        >
                          <FormLabel>생성날짜</FormLabel>
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
        size: 30,
        maxSize: 30,
        minSize: 30,
        cell: ({ row }) => (
          <>
            <Button
              className="
                text-[11px]
                w-[80px]
                h-[20px]
                p-[0]
              "
              variant="destructive"
              onClick={() => {
                router.push(`/${row.original.id}`);
              }}
            >
              상세보러가기
            </Button>
          </>
        ),
      }),
    ],
    [],
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    data: dataResult,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      pagination,
    },
  });

  return (
    <>
      <article
        className="flex flex-col items-center justify-start  size-full"
      >
        <DragTable<PlanDTO>
          table={table}
          dataResult={dataResult}
          setDataResult={setDataResult}
          pagination={pagination}
          columns={columns}
        />
      </article>
    </>
  );
}
