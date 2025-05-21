"use client";

import { DragHandle, DragTable } from "@components/admin/table";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { useReactTable } from "@tanstack/react-table";
import Components from "@components/shadcn";

import {
  CategoryDTO,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../../../types/category";
import {
  useCreateCategoryForm,
  useUpdateCategoryForm,
} from "@hooks/form/useCategoryForm";
import {
  useCategoryList,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@hooks/reactQuery/useCategory";
import { PlusCircle } from "lucide-react";

export default function ClientPage(data) {
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
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [dataResult, setDataResult] = useState<CategoryDTO[]>(data.data);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<number | null>(null);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const categoryList = useCategoryList();
  const createCategory = useCreateCategory(() => {
    setIsCreate(false);
  });
  const updateCategory = useUpdateCategory(() => {});
  const deleteCategory = useDeleteCategory(() => {
    setIsDelete(null);
  });

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const updateCategoryForm = useUpdateCategoryForm();
  const createCategoryForm = useCreateCategoryForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (categoryList.isSuccess) {
      setDataResult(data.data);
      return;
    }
  }, [categoryList.data]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const createToggle = () => {
    setIsCreate(!isCreate);
  };

  const deleteToggle = (data: number) => {
    if (data === isDelete) {
      setIsDelete(null);
    } else {
      setIsDelete(data);
    }
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const createCategoryHandler = (data: CreateCategory) => {
    const categoryData: CreateCategory = {
      name: data.name,
    };

    createCategory.mutate(categoryData);
  };

  const updateCategoryHandler = (data: CategoryDTO) => {
    const categoryData: UpdateCategory = {
      id: data.id,
      name: data.name,
    };

    updateCategory.mutate(categoryData);
  };

  const deleteCategoryHandler = (data: DeleteCategory) => {
    const categoryData: DeleteCategory = {
      id: data.id,
    };

    deleteCategory.mutate(categoryData);
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const columnHelper = createColumnHelper<CategoryDTO>();

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
        id: "actions3",
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
                    updateCategoryForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  태그
                </Button>
              </SheetTrigger>
              <SheetContent
                className="
                  w-[600px]
                  sm:max-w-none
                "
              >
                <Form {...updateCategoryForm}>
                  <form
                    onSubmit={updateCategoryForm.handleSubmit(
                      updateCategoryHandler,
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
                      control={updateCategoryForm.control}
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
                      control={updateCategoryForm.control}
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
                      control={updateCategoryForm.control}
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
                            <Badge variant="outline">
                              {String(field.value)}
                            </Badge>
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
                    updateCategoryForm.reset({
                      ...row.original,
                      createdAt: new Date(row.original.createdAt),
                    }); // form 초기화
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
                <Form {...updateCategoryForm}>
                  <form
                    onSubmit={updateCategoryForm.handleSubmit(
                      updateCategoryHandler,
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
                      control={updateCategoryForm.control}
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
                      control={updateCategoryForm.control}
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
                      control={updateCategoryForm.control}
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
                            <Badge variant="outline">
                              {String(field.value)}
                            </Badge>
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
            <Dialog
              open={isDelete === row.original.id}
              onOpenChange={() => deleteToggle(row.original.id)}
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
                    updateCategoryForm.reset({
                      ...row.original,
                      createdAt: new Date(row.original.createdAt),
                    }); // form 초기화
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
                <Form {...updateCategoryForm}>
                  <form
                    onSubmit={updateCategoryForm.handleSubmit(
                      deleteCategoryHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={updateCategoryForm.control}
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
                      control={updateCategoryForm.control}
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
    [isDelete],
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
            open={isCreate}
            onOpenChange={() => {
              createToggle();
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() =>
                  createCategoryForm.reset({
                    name: "",
                  })
                }
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
                      createCategoryHandler,
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
