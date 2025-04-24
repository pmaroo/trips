"use client";

import { useId, useMemo } from "react";
import Components from "../../shadcn";
import {
  useReactTable,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Menu, MoreHorizontal } from "@deemlol/next-icons";
import { CSS } from "@dnd-kit/utilities";

export function DragHandle({ id }: { id: number }) {
  const { Button } = Components;

  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className=" size-7 text-muted-foreground hover:bg-transparent"
    >
      <Menu size={16} />
    </Button>
  );
}

type DragTableProps<T extends { id: number }> = {
  table: ReturnType<typeof useReactTable<T>>;
  dataResult: T[];
  setDataResult: React.Dispatch<React.SetStateAction<T[]>>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  columns: ColumnDef<T, any>[];
};

// 최소한의 id의 type을 가져야한다고 명시
function DraggableRow<T extends { id: number }>({ row }: { row: Row<T> }) {
  const { TableCell, TableRow } = Components;
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="
        relative
        z-0
        data-[dragging=true]:z-10
        data-[dragging=true]:opacity-80
      "
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DragTable<T extends { id: number }>({
  table,
  dataResult,
  setDataResult,
  pagination,
  columns,
}: DragTableProps<T>) {
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
    Card,
    Input,
  } = Components;

  const sortableId = useId();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => table.getRowModel().rows?.map((row) => row.original.id) || [],
    [table, pagination.pageIndex, dataResult],
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataResult.findIndex((item) => item.id === active.id);
      const newIndex = dataResult.findIndex((item) => item.id === over.id);
      const newData = arrayMove(dataResult, oldIndex, newIndex);

      setDataResult(newData);
      // 페이지 유지 강제 적용

      setTimeout(() => {
        const newData = arrayMove(dataResult, oldIndex, newIndex);
        setDataResult(newData);
        table.setPageIndex(pagination.pageIndex); // 페이지 유지
      }, 100); // 약간의 delay로 애니메이션 타이밍 보완
      table.setPageIndex(pagination.pageIndex);
    }
  }

  const totalPageCount = table.getPageCount();
  const currentPage = pagination.pageIndex;
  const pageRange = 2; // 양옆 몇 개씩 보여줄지
  const startPage = Math.max(currentPage - pageRange, 0);
  const endPage = Math.min(currentPage + pageRange, totalPageCount - 1);

  return (
    <>
      <Card
        className="w-full "
      >
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          sensors={sensors}
          id={sortableId}
          onDragEnd={handleDragEnd}
        >
          <Table
            className="
              h-[80vh]
              table-fixed
            "
          >
            <TableHeader
              className="
                bg-[hsl(var(--muted))]
              "
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      <div
                        className="flex flex-row items-center justify-start w-auto "
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanFilter() && (
                          <Input
                            className="
                              bg-white
                              w-[150px]
                              h-[25px]
                              text-[13px]
                              ml-[10px]
                              placeholder:text-[13px]
                            "
                            value={
                              (header.column.getFilterValue() ?? "") as string
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            placeholder="검색"
                          />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody
              className="align-top "
            >
              {table.getRowModel().rows?.length ? (
                <>
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow<T> key={row.id} row={row} />
                    ))}
                  </SortableContext>

                  {Array.from({
                    length:
                      pagination.pageSize - table.getRowModel().rows.length,
                  }).map((_, idx) => (
                    <TableRow
                      key={`empty-row-${idx}`}
                      className="align-top "
                    >
                      {columns.map((col, colIdx) => (
                        <TableCell
                          key={`empty-cell-${idx}-${colIdx}`}
                          className="
                            max-h-[60px]
                          "
                        >
                          &nbsp;
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center "
                  >
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </Card>

      <Pagination
        className="
          flex
          flex-col
          justify-center
          items-end
          mt-[20px]
        "
      >
        <PaginationContent>
          {/* 처음 페이지로 이동 */}
          {startPage > 0 && (
            <PaginationItem
              className="cursor-pointer "
            >
              <PaginationLink onClick={() => table.setPageIndex(0)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* ... 중간 생략 표시 */}
          {startPage > 1 && (
            <span
              className="px-2 "
            >
              <MoreHorizontal size={20} />
            </span>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const page = startPage + idx;
            return (
              <PaginationItem
                key={page}
                className={
                  page === currentPage
                    ? "bg-[hsl(var(--accent))] rounded-sm"
                    : "cursor-pointer"
                }
              >
                <PaginationLink onClick={() => table.setPageIndex(page)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* ... 중간 생략 표시 */}
          {endPage < totalPageCount - 2 && (
            <span
              className="px-2 "
            >
              <MoreHorizontal size={20} />
            </span>
          )}

          {/* 마지막 페이지로 이동 */}
          {endPage < totalPageCount - 1 && (
            <PaginationItem
              className="cursor-pointer "
            >
              <PaginationLink
                onClick={() => table.setPageIndex(totalPageCount - 1)}
              >
                {totalPageCount}
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
