import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IItemTypes } from "../types/mondayViewsTypes";
import { useParsedData } from "../contexts/dataContext";
import monday from "../configs/mondaySdk";

export const checkDuplicates = async (
  email: string,
  workspaceBoards: number[],
): Promise<IItemTypes[]> => {
  const query = `
  query {
    items_page_by_column_values(
      limit: 50, 
      board_id: ${workspaceBoards}, 
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

  const response = await monday.api(query);
  if (response?.data?.items_page_by_column_values.items) {
    return response.data.items_page_by_column_values.items;
  } else {
    throw new Error("Query did not return any items");
  }
};

export const useCheckDuplicates = (
  email: string
): UseQueryResult<IItemTypes[], Error> => {
  const { workspaceBoards } = useParsedData();
  return useQuery({
    queryKey: ["checkDuplicates", email],
    queryFn: ({ queryKey }) => {
      const [, email] = queryKey;
      return checkDuplicates( email as string, workspaceBoards!,);
    },
    enabled: !!email,
  });
};
