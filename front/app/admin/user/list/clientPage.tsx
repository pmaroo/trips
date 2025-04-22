"use client";

import { useMemo, useState } from "react";
import Components from "../../../components/ui/shadcn";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

export default function ClientPage() {
  const {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Card,
  } = Components;

  type User = {
    id: string;
    name: string;
    email: string;
  };

  const data: User[] = [
    { id: "1", name: "Alice", email: "alice@email.com" },
    { id: "2", name: "Bob", email: "bob@email.com" },
    { id: "3", name: "Charlie", email: "charlie@email.com" },
    { id: "4", name: "David", email: "david@email.com" },
    { id: "5", name: "Eve", email: "eve@email.com" },
    { id: "6", name: "Frank", email: "frank@email.com" },
    { id: "7", name: "Grace", email: "grace@email.com" },
    { id: "8", name: "Hannah", email: "hannah@email.com" },
    { id: "9", name: "Ivy", email: "ivy@email.com" },
    { id: "10", name: "Jack", email: "jack@email.com" },
    { id: "11", name: "Jack", email: "jack@email.com" },
    { id: "12", name: "Jack", email: "jack@email.com" },
    { id: "13", name: "Jack", email: "jack@email.com" },
    { id: "14", name: "Jack", email: "jack@email.com" },
    { id: "15", name: "Jack", email: "jack@email.com" },
    { id: "16", name: "Jack", email: "jack@email.com" },
    { id: "17", name: "Jack", email: "jack@email.com" },
    { id: "18", name: "Jack", email: "jack@email.com" },
    { id: "19", name: "Jack", email: "jack@email.com" },
    { id: "20", name: "Jack", email: "jack@email.com" },
  ];

  const columnHelper = createColumnHelper();

  //   accessor Columns
  //   display Columns
  //   Grouping Columns

  //   columnHelper.accessor("data key string",{header : "헤더이름", cell:({}) => {customizing}})
  const columns = [
    columnHelper.accessor("id", { header: "ID", size: 50 }),
    columnHelper.accessor("name", {
      header: "이름",
      enableColumnFilter: true,
      filterFn: "equalsString",
    }),
    columnHelper.accessor("email", { header: "이메일" }),
  ];

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination }, // 현재 페이지 상태
    onPaginationChange: setPagination, // 페이지 변경 시 호출할 함수
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // 페이지네이션 모델을 설정
    manualPagination: true, // 서버 사이드 페이지네이션이 필요한 경우, 데이터와 페이지 상태를 외부에서 관리
    getFilteredRowModel: getFilteredRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const paginatedData = useMemo(
    () =>
      data.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize,
      ),
    [data, pagination.pageIndex, pagination.pageSize],
  );

  return (
    <article
      className="flex flex-col items-end justify-center "
    >
      <Card
        className="w-full "
      >
        <Table
          className="
            h-[80vh]
          "
        >
          <TableHeader
            className="
              bg-[hsl(var(--muted))]
            "
          >
            {/* 헤더그룹 가져와서 테이블헤더 랜더링 :getHeaderGroups */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`w-[${header.getSize()}]`}
                  >
                    {/* 셀 데이터 렌더링 : flexRender() */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {[
              ...paginatedData,
              ...Array(pagination.pageSize - paginatedData.length).fill(null),
            ].map((row, index) => (
              <TableRow key={index}>
                {row ? (
                  <>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.name}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {/* 각 행에 대한 모델 렌더링 : getRowModel */}
            {/* 현재 화면에 보이는 셀들만 반환 :getVisibleCells */}
            {/* {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </Card>
      <Pagination
        className="flex flex-col items-end justify-center "
      >
        <PaginationContent>
          <PaginationItem
            className="cursor-pointer "
          >
            <PaginationPrevious
              onClick={() => {
                if (table.getPageCount() !== 0) {
                  table.previousPage();
                }
              }}
            />
          </PaginationItem>

          {Array.from({ length: table.getPageCount() }).map((_, idx) => {
            return (
              <PaginationItem
                key={idx}
                className={
                  idx === pagination.pageIndex
                    ? "bg-[hsl(var(--accent))] rounded-sm"
                    : "cursor-pointer "
                }
              >
                <PaginationLink onClick={() => table.setPageIndex(idx)}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem
            className="cursor-pointer "
          >
            <PaginationNext
              onClick={() => {
                if (pagination.pageIndex + 1 !== table.getPageCount()) {
                  table.nextPage();
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </article>
  );
}
