"use client";

import { DragHandle, DragTable } from "../../../../components/admin/table";
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
import { PlusCircle } from "@node_modules/@deemlol/next-icons/build";
import {
  useCreatePlaceForm,
  useUpdatePlaceForm,
} from "@hooks/form/usePlaceForm";
import {
  useCreatePlace,
  useDeletePlace,
  usePlaceList,
  useUpdatePlace,
} from "@hooks/reactQuery/usePlace";
import { CreatePlace, DeletePlace, PlaceDTO, UpdatePlace } from "@/types/place";

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

  const [dataResult, setDataResult] = useState<PlaceDTO[]>(data);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<number | null>(null);

  //////////////////////////////////////////////////////////////
  // HOOK
  //////////////////////////////////////////////////////////////

  const placeList = usePlaceList();
  const createPlace = useCreatePlace(() => {
    setIsCreate(false);
  });
  const updatePlace = useUpdatePlace(() => {});
  const deletePlace = useDeletePlace(() => {
    setIsDelete(null);
  });

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const placeDTOForm = useUpdatePlaceForm();
  const createPlaceForm = useCreatePlaceForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (placeList.isSuccess) {
      setDataResult(placeList.data);
    }
  }, [placeList.data]);

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

  const deletePlaceHandler = (data) => {
    const placeData: DeletePlace = {
      id: data.id,
    };

    deletePlace.mutate(placeData);
  };

  const updatePlaceHandler = (data) => {
    const placeData: UpdatePlace = {
      id: data.id,
      name: data.name,
      address: data.address,
      detailAddress: data.detailAddress,
      postcode: data.postcode,
      lat: data.lat,
      lng: data.lng,
      descript: data.descript,
      image: data.image,
      source: data.source,
    };

    updatePlace.mutate(placeData);
  };

  const createPlaceHandler = (data) => {
    const placeData: CreatePlace = {
      name: data.name,
      address: data.address,
      detailAddress: data.detailAddress,
      postcode: data.postcode,
      lat: data.lat,
      lng: data.lng,
      descript: data.descript,
      image: data.image,
      source: data.source,
    };

    createPlace.mutate(placeData);
  };

  //////////////////////////////////////////////////////////////
  //  TABLE
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const columnHelper = createColumnHelper<PlaceDTO>();

  const columns = useMemo<ColumnDef<PlaceDTO>[]>(
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
        header: "장소이름",
        size: 80,
        maxSize: 80,
        minSize: 80,
      }),
      columnHelper.accessor("address", {
        header: "주소",
        size: 80,
        maxSize: 80,
        minSize: 80,
        cell: ({ row }) => row.original.address + row.original.detailAddress,
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
                    placeDTOForm.reset(row.original); // form 초기화
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
                <Form {...placeDTOForm}>
                  <form
                    onSubmit={placeDTOForm.handleSubmit(
                      updatePlaceHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <SheetHeader>
                      <SheetTitle>장소수정</SheetTitle>
                      <SheetDescription>
                        장소의 정보를 수정할 수 있습니다.
                      </SheetDescription>
                    </SheetHeader>

                    <FormField
                      control={placeDTOForm.control}
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
                      control={placeDTOForm.control}
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
                    placeDTOForm.reset(row.original); // form 초기화
                  }}
                  tabIndex={-1}
                >
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>장소삭제</DialogTitle>
                  <DialogDescription>
                    장소를 삭제하면 회원의 일정에서 안보이게 됩니다.
                  </DialogDescription>
                </DialogHeader>
                <Form {...placeDTOForm}>
                  <form
                    onSubmit={placeDTOForm.handleSubmit(
                      deletePlaceHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={placeDTOForm.control}
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

                    <DialogFooter
                      className="
                        mt-[10px]
                      "
                    >
                      <Button
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
          className="w-auto "
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
                  createPlaceForm.reset({
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
                <PlusCircle size={16} /> 장소
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>장소 추가</DialogTitle>
                  <DialogDescription>
                    장소를 추가할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...createPlaceForm}>
                  <form
                    onSubmit={createPlaceForm.handleSubmit(
                      createPlaceHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={createPlaceForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>장소명</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="장소명을 입력해주세요."
                              autoFocus
                            />
                          </FormControl>
                          <CustomFormMessage name="name" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createPlaceForm.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>우편번호</FormLabel>
                          <FormControl>
                            <Input
                              className="
                                w-[50%]
                              "
                              disabled
                              {...field}
                              placeholder="우편번호를 입력해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="postcode" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createPlaceForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>주소</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              {...field}
                              placeholder="주소를 입력해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="address" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createPlaceForm.control}
                      name="detailAddress"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>상세주소</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="상세주소를 입력해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="detailAddress" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createPlaceForm.control}
                      name="descript"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>설명</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="
                                h-[150px]
                                resize-none
                              "
                              placeholder="설명을 입력해주세요."
                            />
                          </FormControl>
                          <CustomFormMessage name="descript" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createPlaceForm.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>이미지</FormLabel>
                          <FormControl
                            className="
                              ml-[10px]
                            "
                          >
                            <Button>업로드</Button>
                          </FormControl>
                          <CustomFormMessage name="image" />
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
        className="flex flex-col items-center justify-start  size-full"
      >
        <DragTable<PlaceDTO>
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
