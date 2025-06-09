"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { keywordSchema } from "@/types/plan";

type keywordType = z.infer<typeof keywordSchema>;

export function useKeywordForm() {
  return useForm<keywordType>({
    resolver: zodResolver(keywordSchema),
    defaultValues: {
      keyword: "",
    },
  });
}
