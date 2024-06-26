import { MONDAY_API_KEY } from "../constants/mondayQueries";

export const createItem = async (
  boardId: number,
  groupId: string,
  groupTitle: string,
  name: string,
  email: string,
  phone: string
): Promise<any> => {
  const columnValues = JSON.stringify({
    email_1__1: {
      email: email,
      text: email,
    },
    text6__1: phone,
    status0__1: groupTitle,
  });

  const mutation = `
    mutation {
      create_item (
        board_id: ${boardId},
        group_id: "${groupId}",
        item_name: "${name}",
        column_values: "${columnValues.replace(/"/g, '\\"')}"
      ) {
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

  return result.data.create_item;
};
