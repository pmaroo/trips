import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTagSchema, tagDTOSchema } from "../../types/tag";

type createTagType = z.infer<typeof createTagSchema>;
type tagDTOType = z.infer<typeof tagDTOSchema>;

export function useCreateTagForm() {
  return useForm<createTagType>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      tag: "",
    },
  });
}

export function useUpdateTagForm() {
  return useForm<tagDTOType>({
    resolver: zodResolver(tagDTOSchema),
    defaultValues: {
      id: 0,
      tag: "",
    },
  });
}
