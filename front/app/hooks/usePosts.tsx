import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(`http`);

  if (!response.ok) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
  return response.json();
};

// export const usePosts = () => {
//   return useQuery(["posts"], fetchPosts, {
//     staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터 사용
//     cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
//     refetchOnWindowFocus: true, // 창이 포커스될 때 데이터 새로 고침
//   });
// };
