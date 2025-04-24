"use client";

import { PlanDTO } from "../../../types/plan";

const data: PlanDTO[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  UserId: (i + 1).toString(),
  CategoryId: (i + 1).toString(),
  region: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  schedule: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  date: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  User: {
    id: (i + 1).toString(),
    name: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
    email: `${i < 5 ? ["alice", "bob", "charlie", "david", "eve"][i] : "jack"}@email.com`,
  },
  Category: [],
  Place: [],
  traffic: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  createdAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
  updatedAt: i < 5 ? ["Alice", "Bob", "Charlie", "David", "Eve"][i] : "Jack",
}));

export default function ClientPage() {
  return (
    <>
      <article
        className="flex flex-col items-center justify-center  size-full"
      ></article>
    </>
  );
}
