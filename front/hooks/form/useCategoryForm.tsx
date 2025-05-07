import { useForm } from "react-hook-form";
import { categoryDTOSchema, createCategorySchema } from "../../types/category";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type createCategoryType = z.infer<typeof createCategorySchema>;
type categoryDTOType = z.infer<typeof categoryDTOSchema>;

export function useCreateCategoryForm() {
  return useForm<createCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });
}

export function useUpdateCategoryForm() {
  return useForm<categoryDTOType>({
    resolver: zodResolver(categoryDTOSchema),
    defaultValues: {
      id: 0,
      name: "",
    },
  });
}
