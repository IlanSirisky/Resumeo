import { Button } from "monday-ui-react-core";
import { StyledSubtext } from "../../styles/globalDivs";
import { NewItemContainer } from "./styles";
import { useParsedData } from "../../contexts/dataContext";
import { createItem } from "../../hooks/useCreateItem";
import { institutionOptions } from "../../constants/institutionOptions";
import { showNotification } from "../../configs/mondaySdk";
// import { addResumeToItem } from "../../hooks/useAddFile";

interface NewItemProps {
  existingItems?: boolean;
}

const NewItem = ({ existingItems = false }: NewItemProps) => {
  const { parsedData, boardId, columns } = useParsedData();

  const handleCreateItem = async () => {
    if (!parsedData || !boardId || !parsedData?.group) {
      if (!parsedData?.group || !!parsedData?.Name || !!parsedData?.Email) {
        showNotification("Name, Email, and Group are required", "error");
      }
      return;
    }

    const institute = institutionOptions.includes(parsedData.University)
      ? parsedData.University
      : "Other";

    // const cvColId = columns.find((col) => col.title === "CV")?.id;

    try {
      await createItem(
        boardId,
        columns,
        parsedData.group?.id,
        parsedData?.position || "",
        parsedData.Name,
        parsedData.Email,
        parsedData.Phone,
        institute
      );
      // if (newItem && cvColId) {
      //   addResumeToItem(newItem.id, file!, cvColId!);
      // }
      showNotification("Item created successfully", "success");
    } catch (error) {
      showNotification("Failed to create item", "error");
    }
  };

  return (
    <NewItemContainer>
      {existingItems && <StyledSubtext>Not the same candidate?</StyledSubtext>}
      <Button onClick={handleCreateItem} size={Button.sizes.MEDIUM}>
        Create an Item
      </Button>
    </NewItemContainer>
  );
};

export default NewItem;
