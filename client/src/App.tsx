import { useState } from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import ParsedFieldsDisplay from "./components/ParsedFieldsDisplay/ParsedFieldsDisplay";
import ItemTable from "./components/ItemTable/ItemTable";
import { ParsedDataType } from "./types/parsedDataType";
import { AppWrapper } from "./styles/globalDivs";
import Header from "./components/Header/Header";

function App() {
  const [parsedData, setParsedData] = useState<ParsedDataType>();
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
    <AppWrapper>
      <Header />
      <FileUploader
        file={file}
        setFile={setFile}
        onParseSuccess={handleParseSuccess}
        clearFile={handleClearFile}
      />

      {parsedData && (
        <>
          <ParsedFieldsDisplay
            data={parsedData}
            onFieldChange={handleFieldChange}
          />
          <ItemTable email={parsedData.Email} />
        </>
      )}
    </AppWrapper>
  );
}

export default App;
