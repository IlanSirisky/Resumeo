import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

export const parseCV = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "https://api.your-backend-url.com/parse-cv",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const useParseCV = (): UseMutationResult<any, Error, File> => {
  return useMutation<any, Error, File>({
    mutationFn: parseCV,
  });
};
