import { verify } from "@lib/api/jwt";
import { useQuery } from "@node_modules/@tanstack/react-query/build/legacy";

export const useJwt = (token: string) => {
  return useQuery({
    queryKey: ["jwt"],
    queryFn: () => verify(token),
  });
};
