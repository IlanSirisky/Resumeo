import monday from "../configs/mondaySdk";

export const addCommentToItem = async (
  itemId: number,
  comment: string
): Promise<{ id: string }> => {
  const mutation = `
    mutation {
      create_update (item_id: ${itemId}, body: "${comment.replace(/"/g,'\\"')}") {
        id
      }
    }
  `;

  try {
    const response = await monday.api(mutation);
    console.log("Comment added to item:", response.data.create_update);
    
    return response.data.create_update;
  } catch (error) {
    console.error("Failed to add comment to item:", error);
    throw error;
  }
};
