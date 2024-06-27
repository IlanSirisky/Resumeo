import monday from "../configs/mondaySdk";

export const createItem = async (
  boardId: number,
  groupId: string,
  groupTitle: string,
  name: string,
  email: string,
  phone: string,
  institution: string
): Promise<any> => {
  const columnValues = JSON.stringify({
    email_1__1: {
      email: email,
      text: email,
    },
    text6__1: phone,
    status0__1: groupTitle,
    dropdown5__1: institution,
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

  try {
    const response = await monday.api(mutation);
    return response.data.create_item;
  } catch (error) {
    console.error("Failed to create item:", error);
    throw error;
  }
};
