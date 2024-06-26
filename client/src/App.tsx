import FileUploader from "./components/FileUploader/FileUploader";
import ParsedFieldsDisplay from "./components/ParsedFieldsDisplay/ParsedFieldsDisplay";
import ItemTable from "./components/ItemTable/ItemTable";
import { AppWrapper } from "./styles/globalDivs";
import Header from "./components/Header/Header";
import { DataProvider } from "./contexts/dataContext";

function App() {
  return (
    <DataProvider>
      <AppWrapper>
        <Header />
        <FileUploader />
        <ParsedFieldsDisplay />
        <ItemTable />
      </AppWrapper>
    </DataProvider>
  );
}

export default App;
