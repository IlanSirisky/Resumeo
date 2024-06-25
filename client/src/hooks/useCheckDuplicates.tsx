import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const checkDuplicates = async (email: string): Promise<any> => {
  const response = await axios.post(
    "https://api.your-backend-url.com/check-duplicates",
    { email }
  );
  return response.data;
};

export const useCheckDuplicates = (
  email: string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["checkDuplicates", email],
    queryFn: ({ queryKey }) => {
      const [, email] = queryKey;
      return checkDuplicates(email as string);
    },
    enabled: false,
  });
};
