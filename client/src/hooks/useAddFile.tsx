import axios from "axios";
import monday from "../configs/mondaySdk";

const BACKEND_URL =
  "https://d7a70-service-1102328-e995e8aa.us.monday.app/add_resume";

export const addResumeToItem = async (
  itemId: number,
  resume: File,
  cvColId: string
): Promise<any> => {
  // Create a FormData object to send the file and itemId
  const formData = new FormData();
  formData.append("item_id", itemId.toString());
  formData.append("resume", resume);
  formData.append("cv_column_id", cvColId);

  try {
    // Retrieve the client token dynamically using Monday SDK
    const sessionToken = await monday.get("sessionToken");
    console.log("sessionToken:", sessionToken);
    const clientToken = sessionToken.data;

    if (!clientToken) {
      throw new Error("Client token is missing");
    }

    // Define the headers, including the Client-Token
    const headers = {
      "Content-Type": "multipart/form-data",
      "Client-Token": clientToken,
    };

    // Make a POST request to the backend
    const response = await axios.post(BACKEND_URL, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to add file to item:", error);
    throw error;
  }
};
