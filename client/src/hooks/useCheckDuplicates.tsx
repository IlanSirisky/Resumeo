import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { MONDAY_API_KEY } from "../constants/mondayQueries";
import { IItemTypes } from "../types/mondayViewsTypes";

export const checkDuplicates = async (
  boardId: number,
  email: string
): Promise<IItemTypes[]> => {
  const query = `
  query {
    items_page_by_column_values(
      limit: 50, 
      board_id: ${boardId}, 
      columns: [
        {
          column_id: "email_1__1", 
          column_values: ["${email}"]
        }
      ]
    ) {
      items {
        id
        name
        column_values {
          id
          text
        }
      }
    }
  }
  `;

  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_KEY,
      "API-Version": "2023-10",
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors.map((err: any) => err.message).join(", "));
  }

  return result.data.items_page_by_column_values;
};

export const useCheckDuplicates = (
  email: string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["checkDuplicates", email],
    queryFn: ({ queryKey }) => {
      const [, email] = queryKey;
      return checkDuplicates(6888206890, email as string);
    },
    enabled: !!email,
  });
};
