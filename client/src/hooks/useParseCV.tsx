import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { ParsedDataType } from "../types/parsedDataType";

export const parseCV = async (file: File): Promise<ParsedDataType> => {
  const formData = new FormData();
  formData.append("pdf", file);

  const response = await axios.post(
    "https://d7a70-service-1102328-e995e8aa.us.monday.app/upload",
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
