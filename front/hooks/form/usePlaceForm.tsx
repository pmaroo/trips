import { useForm } from "react-hook-form";
import { placeDTOSchema, createPlaceSchema } from "../../types/place";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type createPlaceType = z.infer<typeof createPlaceSchema>;
type placeDTOType = z.infer<typeof placeDTOSchema>;

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
