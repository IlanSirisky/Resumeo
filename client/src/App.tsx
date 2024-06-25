import { useState } from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import ParsedFieldsDisplay from "./components/ParsedFieldsDisplay/ParsedFieldsDisplay";
import DuplicateChecker from "./components/DuplicateChecker/DuplicateChecker";
import { ParsedDataType } from "./types/parsedDataType";
import { AppWrapper } from "./styles/globalDivs";
import Header from "./components/Header/Header";
import { MockData } from "./mockData";

function App() {
  const [parsedData, setParsedData] = useState<ParsedDataType>();

  const handleParseSuccess = (data: any) => {
    setParsedData(data);
  };

  const handleFieldChange = (field: string, value: string) => {
    setParsedData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  return (
    <AppWrapper>
      <Header />
      <FileUploader onParseSuccess={handleParseSuccess} />

      {/* {parsedData && ( */}
        <>
          <ParsedFieldsDisplay
            data={MockData}
            onFieldChange={handleFieldChange}
          />
          <DuplicateChecker email={MockData.email} />
        </>
      {/* )} */}
    </AppWrapper>
  );
}

export default App;
