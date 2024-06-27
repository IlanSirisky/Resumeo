import monday from "../configs/mondaySdk";
import { ICommentHistory } from "../types/mondayViewsTypes";

export const fetchItemCommentHistory = async (
  itemId: number
): Promise<ICommentHistory[]> => {
  const query = `
    query {
        items(ids: ${itemId}) {
            updates {
                id
                body
                created_at
                creator {
                    id
                    name
                }
            }
        }
    }
    `;

  const response = await monday.api(query);
  if (response?.data?.items) {
    return response.data.items[0].updates;
  } else {
    throw new Error("Query did not return any items");
  }
};
