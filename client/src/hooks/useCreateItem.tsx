import monday from "../configs/mondaySdk";
import { IColumnTypes } from "../types/mondayViewsTypes";

const mapColumns = (columns: IColumnTypes[]): Record<string, string> => {
  return columns.reduce((acc, column) => {
    acc[column.title] = column.id;
    return acc;
  }, {} as Record<string, string>);
};

export const createItem = async (
  boardId: number,
  columns: IColumnTypes[],
  groupId: string,
  position: string,
  name: string,
  email: string,
  phone: string,
  institution: string
): Promise<any> => {
  const columnMap = mapColumns(columns);

  const columnValues = JSON.stringify({
    [columnMap["Email"]]: {
      email: email,
      text: email,
    },
    [columnMap["Phone"]]: phone,
    [columnMap["Position"]]: position,
    [columnMap["Institution"]]: institution,
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
