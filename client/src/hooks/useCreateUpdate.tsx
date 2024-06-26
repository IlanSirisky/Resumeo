import { MONDAY_API_KEY } from "../constants/mondayQueries";

export const addCommentToItem = async (
  itemId: number,
  comment: string
): Promise<any> => {
  const mutation = `
    mutation {
      create_update (item_id: ${itemId}, body: "${comment.replace(/"/g, '\\"')}") {
        id
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
    body: JSON.stringify({ query: mutation }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors.map((err: any) => err.message).join(", "));
  }

  return result.data.create_update;
};
