"use client";

import { toast } from "sonner";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CreateTag, DeleteTag, TagDTO, UpdateTag } from "../../types/tag";
import { createTag, deleteTag, tagList, updateTag } from "@lib/api/tag.api";

// 태그 삭제하기
export const useDeleteTag = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: DeleteTag) => deleteTag(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tagList"] });
      toast("태그를 삭제했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 태그 수정하기
export const useUpdateTag = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: UpdateTag) => updateTag(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tagList"] });
      toast("태그를 수정했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 태그 만들기
export const useCreateTag = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: CreateTag) => createTag(categoryData),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tagList"] });
      toast("태그를 생성했습니다.");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast(error?.response.data.message);
    },
  });
};

// 태그 가져오기
export const useTagList = () => {
  return useQuery<TagDTO[]>({
    queryKey: ["tagList"],
    queryFn: () => tagList(),
  });
};
