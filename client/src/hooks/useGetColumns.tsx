import { MONDAY_API_KEY } from "../constants/mondayQueries";
import { IColumnTypes } from "../types/mondayViewsTypes";

export const getBoardColumns = async (
  boardId: number
): Promise<IColumnTypes[]> => {
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

  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_KEY,
      "API-Version": "2023-10",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors.map((err: any) => err.message).join(", "));
  }
  
  return result.data.boards[0].columns;
};
