import { UseQueryResult, useQuery } from "@tanstack/react-query";
import monday from "../configs/mondaySdk";

export const checkDuplicates = async (email: string): Promise<any> => {
  const query = `
    query {
      items_by_column_values(
        board_id: "6888206890", 
        column_id: "Email", 
        column_value: "${email}"
      ) {
        id
        name
        column_values {
          id
          text
        }
      }
    }
  `;

  const response = await monday.api(query);
  console.log(response);

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
    enabled: !!email,
  });
};
