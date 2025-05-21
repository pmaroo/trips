"use client";

import { DragHandle, DragTable } from "../../../../components/admin/table";
import { PlanDTO } from "../../../../types/plan";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { useReactTable } from "@tanstack/react-table";
import Components from "../../../../components/shadcn";
import { useForm } from "react-hook-form";
import { useCreateTagForm, useUpdateTagForm } from "@hooks/form/useTagForm";
import { CreateTag, DeleteTag, TagDTO, UpdateTag } from "../../../../types/tag";
import {
  useCreateTag,
  useDeleteTag,
  useTagList,
  useUpdateTag,
} from "@hooks/reactQuery/useTag";
import { PlusCircle } from "lucide-react";

// const data: PlanDTO[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   UserId: i + 1,
//   CategoryId: i + 1,
//   region: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//   schedule: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//   date: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//   User: {
//     id: i + 1,
//     email: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
//     userName: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//     nickName: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//     type: `${i < 5 ? ["naver", "git", "google", "git", "google"][i] : "kakao"}`,
//     isAdmin: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
//     createdAt: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
//     updatedAt: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
//     isDelete: false,
//     reason: "",
//   },
//   Category: [],
//   Place: [],
//   traffic: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//   createdAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
//   updatedAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
// }));

export default function ClientPage(data) {
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
    DialogPortal,
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [dataResult, setDataResult] = useState<TagDTO[]>(data.data);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<number | null>(null);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const createTag = useCreateTag(() => {
    setIsCreate(false);
  });
  const updateTag = useUpdateTag(() => {});
  const deleteTag = useDeleteTag(() => {
    setIsDelete(null);
  });
  const tagList = useTagList();

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const planDTOForm = useForm<PlanDTO>({});
  const createTagForm = useCreateTagForm();
  const updateTagForm = useUpdateTagForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (tagList.isSuccess) {
      setDataResult(tagList.data);
    }
  }, [tagList.data]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const deleteToggle = (data) => {
    if (data === isDelete) {
      setIsDelete(null);
    } else {
      setIsDelete(data);
    }
  };

  const createToggle = () => {
    setIsCreate(!isCreate);
  };

  //////////////////////////////////////////////////////////////
  // HANDLER
  //////////////////////////////////////////////////////////////

  const deleteTagHandler = (data) => {
    const tagData: DeleteTag = {
      id: data.id,
    };

    deleteTag.mutate(tagData);
  };

  const creaetTagHandler = (data) => {
    const tagData: CreateTag = {
      tag: data.tag,
    };

    createTag.mutate(tagData);
  };

  const updateTagHandler = (data) => {
    const tagData: UpdateTag = {
      id: data.id,
      tag: data.tag,
    };

    updateTag.mutate(tagData);
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const columnHelper = createColumnHelper<TagDTO>();

  const columns = useMemo<ColumnDef<TagDTO>[]>(
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

      columnHelper.accessor("tag", {
        header: "태그명",
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
                    updateTagForm.reset({
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
                <Form {...updateTagForm}>
                  <form
                    onSubmit={updateTagForm.handleSubmit(
                      updateTagHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <SheetHeader>
                      <SheetTitle>태그정보</SheetTitle>
                      <SheetDescription>
                        생성한 태그의 정보를 확인할 수 있습니다.
                      </SheetDescription>
                    </SheetHeader>

                    <FormField
                      control={updateTagForm.control}
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
                      control={updateTagForm.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>태그명</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="태그명을 입력해주세요."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={updateTagForm.control}
                      name="createdAt"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>생성날짜</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Badge variant="outline">
                              {field.value.toString()}
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
                    updateTagForm.reset({
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
                  <DialogTitle>태그삭제</DialogTitle>
                  <DialogDescription>
                    해당 태그가 사용이 되었다면 삭제가 불가능합니다.
                  </DialogDescription>
                </DialogHeader>
                <Form {...updateTagForm}>
                  <form
                    onSubmit={updateTagForm.handleSubmit(
                      deleteTagHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={updateTagForm.control}
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
                      control={updateTagForm.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>태그명</FormLabel>
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
                        mt-[10px]
                      "
                    >
                      <Button
                        type="submit"
                        className="
                          w-full
                        "
                        variant="destructive"
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
                  createTagForm.reset({
                    tag: "",
                  })
                }
                variant="outline"
                className="
                  text-[13px]
                  h-[30px]
                "
                tabIndex={-1}
              >
                <PlusCircle /> 태그
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>태그 추가</DialogTitle>
                  <DialogDescription>
                    태그를 추가할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...createTagForm}>
                  <form
                    onSubmit={createTagForm.handleSubmit(
                      creaetTagHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={createTagForm.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>태그명</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="태그명을 입력해주세요."
                              autoFocus
                            />
                          </FormControl>
                          <CustomFormMessage name="tag" />
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
        <DragTable<TagDTO>
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
