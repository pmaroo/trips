import { useForm } from "react-hook-form";
import {
  placeDTOSchema,
  createPlaceSchema,
  createPlaceTagSchema,
} from "../../types/place";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type createPlaceType = z.infer<typeof createPlaceSchema>;
type placeDTOType = z.infer<typeof placeDTOSchema>;
type createPlaceTagType = z.infer<typeof createPlaceTagSchema>;

export function useCreatePlaceTagForm() {
  return useForm<createPlaceTagType>({
    resolver: zodResolver(createPlaceTagSchema),
  });
}

export function useCreatePlaceForm() {
  return useForm<createPlaceType>({
    resolver: zodResolver(createPlaceSchema),
    defaultValues: {
      name: "",
    },
  });
}

export function useUpdatePlaceForm() {
  return useForm<placeDTOType>({
    resolver: zodResolver(placeDTOSchema),
    defaultValues: {
      id: 0,
      name: "",
    },
  });
}
