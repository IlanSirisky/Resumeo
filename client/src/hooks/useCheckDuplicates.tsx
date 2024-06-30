import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IItemTypes } from "../types/mondayViewsTypes";
import { useParsedData } from "../contexts/dataContext";
import monday from "../configs/mondaySdk";

// Function to get all columns for a board
const getBoardColumns = async (boardId: number) => {
  const query = `
  query {
    boards(ids: ${boardId}) {
      columns {
        id
        title
        type
      }
    }
  }
  `;

  const response = await monday.api(query);
  return response?.data?.boards[0]?.columns || [];
};

// Function to search for an email in a specific column of a board
const searchEmailInColumn = async (
  email: string,
  boardId: number,
  columnId: string
): Promise<IItemTypes[]> => {
  const query = `
  query {
    items_page_by_column_values(
      limit: 50, 
      board_id: ${boardId}, 
      columns: [
        {
          column_id: "${columnId}", 
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
  return response.data.items_page_by_column_values.items || [];
};

// Function to search for an email across all columns in all boards
export const checkDuplicates = async (
  email: string,
  workspaceBoards: number[]
): Promise<IItemTypes[]> => {
  let allItems: IItemTypes[] = [];

  for (const boardId of workspaceBoards) {
    const columns = await getBoardColumns(boardId);
    for (const column of columns) {
      if (column.type !== "email") continue;
      const items = await searchEmailInColumn(email, boardId, column.id);
      allItems = [...allItems, ...items];
    }
  }
  return allItems;
};

export const useCheckDuplicates = (
  email: string
): UseQueryResult<IItemTypes[], Error> => {
  const { workspaceBoards } = useParsedData();
  return useQuery({
    queryKey: ["checkDuplicates", email],
    queryFn: ({ queryKey }) => {
      const [, email] = queryKey;
      return checkDuplicates(email as string, workspaceBoards!);
    },
    enabled: !!email,
  });
};
