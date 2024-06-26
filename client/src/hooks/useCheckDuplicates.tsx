import { UseQueryResult, useQuery } from "@tanstack/react-query";
// import { getAllItemsInBoardQuery } from "../constants/mondayQueries";
// import monday from "../configs/mondaySdk";

export const checkDuplicates = async (email: string): Promise<any> => {
  const query = `
  query {
    items_page_by_column_values(
      limit: 50, 
      board_id: 6888206890, 
      columns: [
        {
          column_id: "email_1__1", 
          column_values: ["${email}"]
        }
      ]
    ) {
      items {
        id
        name
        column_values {
          id
          text
        }
      }
    }
  }
  `;

  // const response = await monday.api(query);
  // return response;
  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3NjUwMzYzMCwiYWFpIjoxMSwidWlkIjo2MDE4NDgxMSwiaWFkIjoiMjAyNC0wNi0yNVQxMjo1Mzo1My4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.-iFrbmQAjzSirRBlWACcUx_ENVU9JkNwmqQARXVCz40",
      "API-Version": "2023-10",
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors.map((err: any) => err.message).join(", "));
  }

  return result.data;
};

export const useCheckDuplicates = (
  email: string
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["checkDuplicates", email],
    queryFn: ({ queryKey }) => {
      const [, email] = queryKey;
      return checkDuplicates(email as string);
    },
    enabled: !!email,
  });
};
