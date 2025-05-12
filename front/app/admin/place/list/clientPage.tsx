"use client";

import { DragHandle, DragTable } from "../../../../components/admin/table";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { useReactTable } from "@tanstack/react-table";
import Components from "../../../../components/shadcn";
import { Delete, PlusCircle, XCircle } from "@deemlol/next-icons";
import {
  useCreatePlaceForm,
  useCreatePlaceTagForm,
  useUpdatePlaceForm,
} from "@hooks/form/usePlaceForm";
import {
  useCreatePlace,
  useCreatePlaceTag,
  useDeletePlace,
  usePlaceList,
  useUpdatePlace,
} from "@hooks/reactQuery/usePlace";
import {
  CreatePlace,
  CreatePlaceTag,
  DeletePlace,
  PlaceDTO,
  UpdatePlace,
} from "@/types/place";
import { useImageState, useLatLongState } from "@store/commonStore";
import { useImageUpload, useLatLongAPI } from "@hooks/reactQuery/useCommon";
import { Theme } from "@components/theme";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useTagList } from "@hooks/reactQuery/useTag";
import { toast } from "@node_modules/sonner/dist";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } = Components;

  //////////////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////////////

  const [dataResult, setDataResult] = useState<PlaceDTO[]>(data.data);
  const [tagDatum, setTagDatum] = useState<{ tag: string }[]>([]);
  //
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<number | null>(null);
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [isTag, setIsTag] = useState<boolean>(false);
  //
  const imageRef = useRef(null);
  //
  const theme = useContext(Theme);

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
  const imageUpload = useImageUpload(() => {});
  const latLongAPI = useLatLongAPI(() => {});
  const tagList = useTagList();
  const createPlaceTag = useCreatePlaceTag(() => {});

  //////////////////////////////////////////////////////////////
  // STORE
  //////////////////////////////////////////////////////////////

  const imageStore = useImageState((state) => state);
  const latLongStore = useLatLongState((state) => state);

  //////////////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////////////

  const placeDTOForm = useUpdatePlaceForm();
  const createPlaceForm = useCreatePlaceForm();
  const createPlaceTagForm = useCreatePlaceTagForm();

  //////////////////////////////////////////////////////////////
  // USEEFFECT
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    createPlaceForm.setValue("lat", latLongStore.lat);
    createPlaceForm.setValue("lng", latLongStore.long);
  }, [latLongStore.lat, latLongStore.long]);

  useEffect(() => {
    if (placeList.isSuccess) {
      setDataResult(placeList.data);
    }
  }, [placeList.data]);

  //////////////////////////////////////////////////////////////
  // TOGGLE
  //////////////////////////////////////////////////////////////

  const tagToggle = () => {
    setIsTag(!isTag);
  };

  const addressToggle = () => {
    setIsAddress(!isAddress);
  };

  const imageToggle = () => {
    imageRef.current.click();
  };

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

  const createPlaceTagHandler = (data) => {
    const placeData: CreatePlaceTag = {
      name: data.name,
      id: 0,
      Tag: tagDatum,
    };

    createPlaceTag.mutate(placeData);
  };

  const tagDatumDeleteHandler = (data: string) => {
    let datum = tagDatum ? tagDatum.map((value) => value) : [];
    const currentTag = datum.findIndex((value) => value.tag === data);
    if (currentTag !== -1) {
      datum.splice(currentTag, 1);
      setTagDatum(datum);
    }
  };

  const tagDatumHandler = (data: string) => {
    let datum = tagDatum ? tagDatum.map((value) => value) : [];
    const currentTag = datum.findIndex((value) => value.tag === data);

    if (currentTag === -1) {
      datum.push({ tag: data });
      setTagDatum(datum);
    } else {
      toast("이미 추가한 태그입니다.");
    }
  };

  const imageUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "trips_images"); // 위에서 만든 preset 이름
    formData.append("cloud_name", "dcgq2sysr"); // 본인의 cloud name

    await imageUpload.mutate(formData);
  };

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
      Tag: tagDatum,
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
                  onClick={(e) => {
                    placeDTOForm.reset(row.original);
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
                    <FormItem
                      className="
                        mb-[10px]
                      "
                    >
                      <FormLabel
                        className="
                          mr-[10px]
                        "
                      >
                        태그
                      </FormLabel>

                      {row.original.Tag.map((data, idx) => {
                        return (
                          <Badge
                            className="
                              mr-[5px]
                              mb-[5px]
                              cursor-pointer
                            "
                            key={idx}
                          >
                            {data.tag}
                          </Badge>
                        );
                      })}
                    </FormItem>

                    <FormField
                      control={placeDTOForm.control}
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
                      control={placeDTOForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>주소</FormLabel>
                          <FormControl>
                            <div
                              className="flex items-center w-full space-x-2 "
                            >
                              <Input
                                disabled
                                {...field}
                                placeholder="주소를 입력해주세요."
                              />
                              <Button onClick={addressToggle} type="button">
                                검색
                              </Button>
                            </div>
                          </FormControl>
                          <CustomFormMessage name="address" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={placeDTOForm.control}
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
                      control={placeDTOForm.control}
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
                      control={placeDTOForm.control}
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
                            <Button onClick={imageToggle} type="button">
                              업로드
                              <input
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                hidden={true}
                                onChange={imageUploadHandler}
                              />
                            </Button>
                          </FormControl>
                          <CustomFormMessage name="image" />
                        </FormItem>
                      )}
                    />

                    {imageStore.images.map((data) => {
                      return (
                        <div
                          className="
                            rounded
                            relative
                            border-[1px]
                            p-[10px]
                          "
                          key={data.id}
                        >
                          <Button
                            type="button"
                            variant="destructive"
                            className="
                              absolute
                              top-[10px]
                              right-[10px]
                            "
                          >
                            <XCircle size={24} color={theme.white} />
                          </Button>
                          <img src={data.url} />
                        </div>
                      );
                    })}

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
                    postcode: "",
                    address: "",
                    detailAddress: "",
                    descript: "",
                    source: "local",
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
              <DialogContent
                className="
                  max-h-[90vh]
                  overflow-auto
                "
              >
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

                    <FormItem
                      className="
                        mb-[10px]
                      "
                    >
                      <FormLabel>태그</FormLabel>
                      <FormControl
                        className="
                          ml-[10px]
                        "
                      >
                        <Select
                          onValueChange={(e) => {
                            tagDatumHandler(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="태그를 선택해주세요." />
                          </SelectTrigger>

                          <SelectContent>
                            {tagList.data &&
                              tagList.data.map((data) => {
                                return (
                                  <SelectItem
                                    key={data.id}
                                    value={data.tag}
                                    className="duration-100  // hover:bg-gray-100"
                                  >
                                    {data.tag}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>

                    {tagDatum.map((data, idx) => {
                      return (
                        <Badge
                          className="
                            mr-[5px]
                            mb-[5px]
                            cursor-pointer
                          "
                          onClick={() => tagDatumDeleteHandler(data.tag)}
                          key={idx}
                        >
                          {data.tag}&nbsp;&nbsp;
                          <Delete size={16} color="#FFFFFF" />
                        </Badge>
                      );
                    })}

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
                            <div
                              className="flex items-center w-full space-x-2 "
                            >
                              <Input
                                disabled
                                {...field}
                                placeholder="주소를 입력해주세요."
                              />
                              <Button onClick={addressToggle} type="button">
                                검색
                              </Button>
                            </div>
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
                            <Button onClick={imageToggle} type="button">
                              업로드
                              <input
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                hidden={true}
                                onChange={imageUploadHandler}
                              />
                            </Button>
                          </FormControl>
                          <CustomFormMessage name="image" />
                        </FormItem>
                      )}
                    />

                    {imageStore.images.map((data) => {
                      return (
                        <div
                          className="
                            rounded
                            relative
                            border-[1px]
                            p-[10px]
                          "
                          key={data.id}
                        >
                          <Button
                            type="button"
                            variant="destructive"
                            className="
                              absolute
                              top-[10px]
                              right-[10px]
                            "
                          >
                            <XCircle size={24} color={theme.white} />
                          </Button>
                          <img src={data.url} />
                        </div>
                      );
                    })}

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
        <li
          className="w-auto "
        >
          <Dialog
            open={isTag}
            onOpenChange={() => {
              tagToggle();
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
                <PlusCircle size={16} /> 태그
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent
                className="
                  max-h-[90vh]
                  overflow-auto
                "
              >
                <DialogHeader>
                  <DialogTitle>태그 추가</DialogTitle>
                  <DialogDescription>
                    장소에 태그를 추가할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>

                <Form {...createPlaceTagForm}>
                  <form
                    onSubmit={createPlaceTagForm.handleSubmit(
                      createPlaceTagHandler,
                      (errors) => {
                        console.log("유효성 에러 발생:", errors);
                      },
                    )}
                  >
                    <FormField
                      control={createPlaceTagForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem
                          className="
                            mb-[10px]
                          "
                        >
                          <FormLabel>장소명</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="장소를 선택해주세요." />
                              </SelectTrigger>

                              <SelectContent>
                                {placeList.data &&
                                  placeList.data.map((data) => {
                                    return (
                                      <SelectItem
                                        key={data.id}
                                        value={data.name}
                                        className="duration-100  // hover:bg-gray-100"
                                      >
                                        {data.name}
                                      </SelectItem>
                                    );
                                  })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <CustomFormMessage name="name" />
                        </FormItem>
                      )}
                    />

                    <FormItem
                      className="
                        mb-[10px]
                      "
                    >
                      <FormLabel>태그</FormLabel>
                      <FormControl
                        className="
                          ml-[10px]
                        "
                      >
                        <Select
                          onValueChange={(e) => {
                            tagDatumHandler(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="태그를 선택해주세요." />
                          </SelectTrigger>

                          <SelectContent>
                            {tagList.data &&
                              tagList.data.map((data) => {
                                return (
                                  <SelectItem
                                    key={data.id}
                                    value={data.tag}
                                    className="duration-100  // hover:bg-gray-100"
                                  >
                                    {data.tag}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>

                    {tagDatum.map((data, idx) => {
                      return (
                        <Badge
                          className="
                            mr-[5px]
                            mb-[5px]
                            cursor-pointer
                          "
                          onClick={() => tagDatumDeleteHandler(data.tag)}
                          key={idx}
                        >
                          {data.tag}&nbsp;&nbsp;
                          <Delete size={16} color="#FFFFFF" />
                        </Badge>
                      );
                    })}

                    <Button
                      type="submit"
                      className="
                        w-full
                        mt-[20px]
                      "
                    >
                      추가하기
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </li>
      </ul>

      <Dialog onOpenChange={addressToggle} open={isAddress}>
        <DialogTitle></DialogTitle>
        <DialogContent
          className="
            h-[600px]
          "
        >
          <DaumPostcodeEmbed
            style={{ height: `100%` }}
            onComplete={(data) => {
              createPlaceForm.setValue("address", data.address);
              createPlaceForm.setValue("postcode", data.zonecode);
              latLongAPI.mutate(data.address);
              setIsAddress(false);
            }}
            autoClose={false}
          />
        </DialogContent>
      </Dialog>

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
