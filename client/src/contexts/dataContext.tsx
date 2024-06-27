import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IPosition, ParsedDataType } from "../types/parsedDataType";
import monday from "../configs/mondaySdk";
import { IColumnTypes, IGroupTypes } from "../types/mondayViewsTypes";
import { getBoardInfoQuery } from "../constants/mondayQueries";

interface DataContextType {
  parsedData: ParsedDataType | undefined;
  setParsedData: (data: ParsedDataType) => void;
  file: File | null;
  boardId: number | null;
  groups: IGroupTypes[];
  columns: IColumnTypes[];
  setFile: (file: File | null) => void;
  handleParseSuccess: (data: any) => void;
  handleClearFile: () => void;
  handleFieldChange: (field: string, value: string | IPosition) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [parsedData, setParsedData] = useState<ParsedDataType | undefined>(
    undefined
  );
  const [file, setFile] = useState<File | null>(null);
  const [boardId, setBoardId] = useState<number | null>(null);
  const [groups, setGroups] = useState<IGroupTypes[]>([]);
  const [columns, setColumns] = useState<IColumnTypes[]>([]);

  useEffect(() => {
    monday
      .get("context")
      .then((res) => {
        const context = res.data as any;
        const contextBoardId = context.boardId;

        if (contextBoardId) {
          setBoardId(contextBoardId);
          fetchBoardData(contextBoardId);
        } else {
          console.error("Board ID not found in context");
        }
      })
      .catch((err) => {
        console.error("Error fetching context:", err);
      });
  }, []);

  const fetchBoardData = (boardId: string) => {
    monday
      .api(getBoardInfoQuery, { variables: { boardId: [boardId] } })
      .then((res) => {
        const boardData = res.data.boards[0];
        setGroups(boardData.groups);
        setColumns(boardData.columns);
      })
      .catch((err) => {
        console.error("Error fetching board data:", err);
      });
  };

  const handleParseSuccess = (data: any) => {
    setParsedData(data);
  };

  const handleClearFile = () => {
    setFile(null);
    setParsedData(undefined);
  };

  const handleFieldChange = (field: string, value: string | IPosition) => {
    setParsedData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  return (
    <DataContext.Provider
      value={{
        parsedData,
        setParsedData,
        file,
        setFile,
        handleParseSuccess,
        handleClearFile,
        handleFieldChange,
        boardId,
        groups,
        columns,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useParsedData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useParsedData must be used within a ParsedDataProvider");
  }
  return context;
};
