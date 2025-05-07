"use client";

import {
  categoryList,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@lib/api/category.api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  CategoryDTO,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../types/category";
import { toast } from "sonner";

// 카테고리 삭제하기
export const useDeleteCategory = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: DeleteCategory) => deleteCategory(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      toast("카테고리를 삭제했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 카테고리 수정하기
export const useUpdateCategory = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: UpdateCategory) => updateCategory(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      toast("카테고리를 수정했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 카테고리 만들기
export const useCreateCategory = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: CreateCategory) => createCategory(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      toast("카테고리를 생성했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 카테고리 가져오기
export const useCategoryList = () => {
  return useQuery<CategoryDTO[]>({
    queryKey: ["categoryList"],
    queryFn: () => categoryList(),
  });
};
