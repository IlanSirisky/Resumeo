import monday from "../configs/mondaySdk";

// Not working currently, CORS issue
export const addResumeToItem = async (
  itemId: number,
  resume: File
): Promise<any> => {
  const mutation = `
    mutation {
    add_file_to_column (
        item_id: ${itemId},
        column_id: "files__1",
        file: ${resume}
        ) {
            id
        }
    }
    `;

  try {
    const response = await monday.api(mutation);
    return response.data.add_file_to_column;
  } catch (error) {
    console.error("Failed to add file to item:", error);
    throw error;
  }
};
