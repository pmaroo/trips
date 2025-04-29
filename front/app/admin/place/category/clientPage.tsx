"use client";

import { DragHandle, DragTable } from "@components/admin/table";
import { PlanDTO } from "../../../../types/plan";
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
import { PlusCircle } from "@deemlol/next-icons";
import {
  CategoryDTO,
  CreateCategory,
  createCategorySchema,
} from "../../../../types/category";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type createCategoryType = z.infer<typeof createCategorySchema>;

const data: CategoryDTO[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  Tag: [],
  Plan: [],
  createdAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  updatedAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
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
    DialogPortal,
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

  const [dataResult, setDataResult] = useState<CategoryDTO[]>(data);
  const columnHelper = createColumnHelper<CategoryDTO>();

  const categoryDTOForm = useForm<CategoryDTO>({});
  const createCategoryForm = useForm<createCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const createSubmit = (data: CreateCategory) => {
    console.log(data);
  };

  const onSubmit = (data: CategoryDTO) => {
    console.log(data);
  };

  const columns = useMemo<ColumnDef<CategoryDTO>[]>(
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
      columnHelper.accessor("name", {
        header: "카테고리",
        size: 80,
        maxSize: 80,
        minSize: 80,
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
                    categoryDTOForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  수정
                </Button>
              </SheetTrigger>
              <SheetContent
                className="
                  w-[600px]
                  sm:max-w-none
                "
              >
                <Form {...categoryDTOForm}>
                  <form
                    onSubmit={categoryDTOForm.handleSubmit(
                      onSubmit,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <SheetHeader>
                      <SheetTitle>카테고리 수정</SheetTitle>
                      <SheetDescription>
                        카테고리명을 수정할 수 있으며, 수정 시 해당 카테고리를
                        사용한 곳에서 전부 변경됩니다.
                      </SheetDescription>
                    </SheetHeader>

                    <FormField
                      control={categoryDTOForm.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
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
                      control={categoryDTOForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>카테고리명</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="카테고리명을 입력해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="name" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={categoryDTOForm.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>작성날짜</FormLabel>
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
                    categoryDTOForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>카테고리 삭제</DialogTitle>
                  <DialogDescription>
                    카테고리를 장소에서 사용한 경우 삭제할 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <Form {...categoryDTOForm}>
                  <form
                    onSubmit={categoryDTOForm.handleSubmit(
                      onSubmit,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={categoryDTOForm.control}
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
                      control={categoryDTOForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>카테고리명</FormLabel>
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

                    <DialogFooter
                      className="
                        mt-[20px]
                      "
                    >
                      <Button
                        type="submit"
                        variant="destructive"
                        className="
                          w-full
                        "
                      >
                        삭제하기
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
          className="
            w-auto
          "
        >
          <Dialog
            onOpenChange={(open) => {
              if (open) {
                createCategoryForm.reset({
                  name: "",
                });
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="
                  text-[13px]
                  h-[30px]
                "
                tabIndex={-1}
              >
                <PlusCircle size={16} /> 카테고리
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>카테고리 추가</DialogTitle>
                  <DialogDescription>
                    카테고리를 추가할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...createCategoryForm}>
                  <form
                    onSubmit={createCategoryForm.handleSubmit(
                      onSubmit,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={createCategoryForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>카테고리명</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="카테고리명을 입력해주세요."
                              autoFocus
                            />
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
                      생성하기
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </li>
      </ul>

      <article
        className="
          flex
          flex-col
          items-center
          justify-start
          size-full
        "
      >
        <DragTable<CategoryDTO>
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
