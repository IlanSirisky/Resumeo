import { createContext, useContext, useState, ReactNode } from 'react';
import { ParsedDataType } from '../types/parsedDataType';

interface DataContextType {
  parsedData: ParsedDataType | undefined;
  setParsedData: (data: ParsedDataType) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  handleParseSuccess: (data: any) => void;
  handleClearFile: () => void;
  handleFieldChange: (field: string, value: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [parsedData, setParsedData] = useState<ParsedDataType | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleParseSuccess = (data: any) => {
    setParsedData(data);
  };

  const handleClearFile = () => {
    setFile(null);
    setParsedData(undefined);
  };

  const handleFieldChange = (field: string, value: string) => {
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useParsedData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useParsedData must be used within a ParsedDataProvider');
  }
  return context;
};
