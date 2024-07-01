import monday from "../configs/mondaySdk";

export const addResumeToItem = async (
  itemId: number,
  resume: File,
  cvColId: string
): Promise<any> => {
  try {
    const response = await monday.api(
      `mutation ($file: File!) {
          add_file_to_column(item_id: ${itemId}, column_id: "${cvColId}", file: $file) {
              id
          }
      }`,
      {
        variables: {
          file: resume,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
};
